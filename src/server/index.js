const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { analyze } = require("./analyze.js");

//using cors origin
app.use(cors());
//use the dist folder
app.use(express.static("dist"));
//configure my env file
dotenv.config();

port = 8000;
const key = process.env.API_KEY;
// read the json files coming
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.html");
});
// post async function
app.post("/", async (req, res) => {
  const url = req.body.input;
  const Analyze = await analyze(url, key);
  const { code, msg, sample } = Analyze;
  if (code == 100 || code == 212) {
    return res.send({ msg: msg, code: code });
  }
  return res.send({ sample: sample, code: code });
});
// server listen to port 8000
app.listen(8000, () => console.log(`server is listening on port ${port}`));
