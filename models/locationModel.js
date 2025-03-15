const locations = {};

// Function to save location
export const saveLocation = (userId, latitude, longitude) => {
  locations[userId] = { latitude, longitude, timestamp: new Date() };
};

// Function to get the latest location of a user
export const getLocation = (userId) => {
  return locations[userId] || null;
};
