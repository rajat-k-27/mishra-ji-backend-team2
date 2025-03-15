import { saveLocation, getLocation } from "../models/locationModel.js";
import { getGoogleMapsRoute } from "../utils/googleMaps.js";

// Save user location in the database
export const updateLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  try {
    await saveLocation(userId, latitude, longitude);
    res.json({ success: true, message: "Location updated!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update location" });
  }
};

// Fetch the route from Google Maps API
export const getRoute = async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const route = await getGoogleMapsRoute(origin, destination);
    res.json({ success: true, route });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch route" });
  }
};
