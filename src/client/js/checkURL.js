const validUrl = require("valid-url");

const isValidUrl = (url) => Boolean(validUrl.isWebUri(url));

module.exports = {
  isValidUrl,
};

const validateURL = (url) => {
  return isValidUrl(url);
};

module.exports = { validateURL };
