const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sensorRouter = require("../router/sensor");
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;

console.log("EMAIL,PASSWORD", EMAIL, PASSWORD);

app.get("/", (req, res) => {
  res.status(200).send("App is Running").end();
});

app.use(bodyParser.json());
// sensor route
app.use("/sensor", sensorRouter);

module.exports = { app };
