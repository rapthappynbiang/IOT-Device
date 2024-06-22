const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sensorRouter = require("../router/sensor");

app.get("/", (req, res) => {
  res.status(200).send("App is Running").end();
});

app.use(bodyParser.json());
// sensor route
app.use("/sensor", sensorRouter);

module.exports = { app };
