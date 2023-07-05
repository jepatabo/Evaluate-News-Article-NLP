// Import the axios library for making HTTP requests
import axios from "axios";

// Import the validateURL function from the "./checkURL" module
import { validateURL } from "./checkURL";

// Check if the document object is defined (for client-side code)
// Assign DOM elements to variables if the document object is defined, otherwise assign null
const input = typeof document !== "undefined" ? document.querySelector("form input") : null;
const form = typeof document !== "undefined" ? document.querySelector("form") : null;
const error = typeof document !== "undefined" ? document.querySelector("#error") : null;
const agreement = typeof document !== "undefined" ? document.getElementById("agreement") : null;
const subjectivity = typeof document !== "undefined" ? document.getElementById("subjectivity") : null;
const confidence = typeof document !== "undefined" ? document.getElementById("confidence") : null;
const irony = typeof document !== "undefined" ? document.getElementById("irony") : null;
const score_tag = typeof document !== "undefined" ? document.getElementById("score_tag") : null;
const results = typeof document !== "undefined" ? document.querySelectorAll("#results div") : [];

// Function to show error message
const show_error = (msg) => {
  // Check if the error element exists
  if (error) {
    error.style.display = "block";
    results.forEach((result) => {
      result.style.display = "none";
    });
    error.innerHTML = msg;
  }
};

// Function to show analysis results
const show_results = (sample) => {
  // Check if the error element exists
  if (error) {
    error.style.display = "none";
    results.forEach((result) => {
      result.style.display = "block";
    });
    agreement.innerHTML = `Agreement: ${sample.agreement}`;
    subjectivity.innerHTML = `Subjectivity: ${sample.subjectivity}`;
    confidence.innerHTML = `Confidence: ${sample.confidence}`;
    irony.innerHTML = `Irony: ${sample.irony}`;
    score_tag.innerHTML = `Score Tag: ${sample.score_tag}`;
  }
};

// Event handler for form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  if (!validateURL(input.value)) {
    // Validate the input URL using the validateURL function
    // If it is not valid, show an error message
    show_error("Please enter a valid URL");
    return;
  }
  // Make a POST request to the server with the form data
  const { data } = await axios.post("http://localhost:8000/", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { msg, sample } = data;
  if (msg) {
    // If there is an error message in the response, show it
    show_error(msg);
    return;
  }
  // Show the analysis results
  show_results(sample);
};

// Export the handleSubmit function
export { handleSubmit };
