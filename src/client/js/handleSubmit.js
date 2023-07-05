import axios from "axios";
import { validateURL } from "./checkURL";

const input = typeof document !== "undefined" ? document.querySelector("form input") : null;
const form = typeof document !== "undefined" ? document.querySelector("form") : null;
const error = typeof document !== "undefined" ? document.querySelector("#error") : null;
const agreement = typeof document !== "undefined" ? document.getElementById("agreement") : null;
const subjectivity = typeof document !== "undefined" ? document.getElementById("subjectivity") : null;
const confidence = typeof document !== "undefined" ? document.getElementById("confidence") : null;
const irony = typeof document !== "undefined" ? document.getElementById("irony") : null;
const score_tag = typeof document !== "undefined" ? document.getElementById("score_tag") : null;
const results = typeof document !== "undefined" ? document.querySelectorAll("#results div") : [];

const show_error = (msg) => {
  if (error) {
    error.style.display = "block";
    results.forEach((result) => {
      result.style.display = "none";
    });
    error.innerHTML = msg;
  }
};

const show_results = (sample) => {
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

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!validateURL(input.value)) {
    show_error("Please enter a valid URL");
    return;
  }
  const { data } = await axios.post("http://localhost:8000/", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { msg, sample } = data;
  if (msg) {
    show_error(msg);
    return;
  }
  show_results(sample);
};

export { handleSubmit };
