const express = require("express");
const app = express();
const cors = require("cors");
const { analyze } = require("eslint-scope");
//using cors origin
app.use(cors());

port = 8000;
// read the json files coming
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server page");
});

app.post("/", async (req, res) => {
  const body = await req.body;
  const Analyze = analyze(body);
});

app.listen(8000, () => console.log(`server is listening on port ${port}`));

console.log("hello");
