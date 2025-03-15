const { saveLocation, getLocation } = require("../models/locationModel");
const { getGoogleMapsRoute } = require("../utils/googleMaps");

// Save user location in the database
exports.updateLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  try {
    await saveLocation(userId, latitude, longitude);
    res.json({ success: true, message: "Location updated!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update location" });
  }
};

// Fetch the route from Google Maps API
exports.getRoute = async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const route = await getGoogleMapsRoute(origin, destination);
    res.json({ success: true, route });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch route" });
  }
};
