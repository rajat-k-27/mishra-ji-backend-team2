const locations = {};

// Function to save location
exports.saveLocation = (userId, latitude, longitude) => {
  locations[userId] = { latitude, longitude, timestamp: new Date() };
};

// Function to get the latest location of a user
exports.getLocation = (userId) => {
  return locations[userId] || null;
};
