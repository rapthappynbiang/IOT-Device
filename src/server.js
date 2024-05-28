const PORT = 3000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.get("/", (req, res) => {
  res.status(200).send("App is Running").end();
});

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App is Listening at ${PORT}`);
});
