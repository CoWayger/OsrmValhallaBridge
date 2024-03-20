# Use the official Node.js image with the desired version
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/app

# Copy the application code from the src folder
COPY src ./

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]