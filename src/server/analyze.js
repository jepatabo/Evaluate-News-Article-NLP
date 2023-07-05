// Import the required dependencies
const axios = require("axios");
const { CLOSING } = require("ws");

// Define the MeaningCloud API endpoint
const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";

// Function to analyze the sentiment of a given URL using MeaningCloud API
const analyze = async (url, key) => {
  // Make a GET request to the MeaningCloud API with the provided URL and API key
  const analysis = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`).then((response) => {
    const { code } = response.data.status;
    const { msg } = response.data.status;

    // Check the response code and handle errors or success accordingly
    if (code == 100) {
      return handleErrors(code, "Please enter a valid URL");
    } else if (code == 212) {
      return handleErrors(code, msg);
    }
    return handleSuccess(response.data, code);
  });

  return analysis;
};

// Function to handle errors
const handleErrors = (code, msg) => {
  const error = {
    code,
    msg,
  };
  return error;
};

// Function to handle successful analysis
const handleSuccess = (data, code) => {
  const { agreement, subjectivity, confidence, score_tag, irony } = data;
  const sample = {
    agreement,
    subjectivity,
    confidence,
    score_tag,
    irony,
  };
  const result = {
    sample,
    code,
  };
  return result;
};

// Export the analyze function to be used in other modules
module.exports = { analyze };
