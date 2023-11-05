# OSRM to Valhalla Bridge App

This repository contains a Node.js application that serves as a bridge between the OSRM (Open Source Routing Machine) and the Valhalla routing engine. The purpose of this application is to provide an easy way to migrate from OSRM to Valhalla for routing and navigation needs. This README file will guide you through the installation, setup, and usage of this bridge app.

## Prerequisites

Before using this bridge application, ensure you have the following prerequisites installed:

1. **Node.js**: Make sure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

2. **OSRM Data**: If you are migrating from OSRM to Valhalla, you should already have the OSRM data prepared. If not, follow the OSRM documentation to set up the data.

3. **Valhalla Data**: Prepare the Valhalla routing data that you intend to use.

4. **Configurations**: Create a configuration file to specify the data sources and other settings required for the bridge application. Sample configuration templates are provided in the `config` directory of this repository.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/osrm-to-valhalla-bridge.git
   ```

2. start aplication in PM2 manager
   cd src && pm2 start