const express = require('express');
const request = require('request');
const polyline = require('@mapbox/polyline');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const valhallaEndpoint = process.env.VALHALLA_ENDPOINT;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Define a route to emulate OSRM route request with GET
app.get('/route/v1/driving/:coordinates', (req, res) => {
  // Extract the coordinates and other parameters from the URL
  let { coordinates } = req.params;
  coordinates = coordinates.split(";").map((elm) => {
    return elm.split(",");
  })

  if (!coordinates || coordinates.length < 2) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  // Create a request to Valhalla's Route Optimization API
  const valhallaRequestData = {
    locations: coordinates.map(coord => ({ lat: coord[1], lon: coord[0] })),
    costing: 'auto',
    costing_options: {},
  };

  request.post(valhallaEndpoint, { json: valhallaRequestData }, (valhallaError, valhallaResponse, valhallaBody) => {
    if (valhallaError) {
      console.error(valhallaError);
      return res.status(500).json({ error: 'Valhalla API error' });
    }

    if (valhallaResponse.statusCode !== 200) {
      return res.status(500).json({ error: 'Valhalla API request failed' });
    }
    console.log(JSON.stringify(valhallaBody));
    // Convert Valhalla's Polyline6 to Polyline5
    const poly5Shape = polyline.encode(polyline.decode(valhallaBody.trip.legs[0].shape, 6), 5);

    // Translate Valhalla's response to OSRM format (modify as needed)
    const osrmResponse = {
      code: 'Ok',
      routes: [
        {
          geometry: poly5Shape,
          legs: [
            {
              steps: [],
              distance: valhallaBody.trip.legs[0].length * 1000, // Convert to meters
              duration: valhallaBody.trip.legs[0].time,
              summary: '',
            },
          ],
          distance: valhallaBody.trip.legs[0].summary.length * 1000, // Convert to meters
          duration: valhallaBody.trip.legs[0].summary.time,
          weight_name: 'routability',
          weight: valhallaBody.trip.legs[0].summary.cost,
        },
      ],
      waypoints: coordinates.map((coord, index) => ({
        name: `Waypoint ${index}`,
        location: [coord[0], coord[1]],
      })),
    };

    res.json(osrmResponse);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
