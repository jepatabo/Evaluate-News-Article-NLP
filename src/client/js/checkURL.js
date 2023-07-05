// Import the valid-url package
const validUrl = require("valid-url");

// Function to check if a URL is valid
const isValidUrl = (url) => Boolean(validUrl.isWebUri(url));

// Export the isValidUrl function
module.exports = {
  isValidUrl,
};

// Function to validate a URL using isValidUrl function
const validateURL = (url) => {
  return isValidUrl(url);
};

// Export the validateURL function
module.exports = { validateURL };
