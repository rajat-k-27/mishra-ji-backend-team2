const axios = require("axios");
require("dotenv").config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getGoogleMapsRoute = async (origin, destination) => {
  try {
    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Google Maps API Error:", error);
    throw error;
  }
};
