const { publishMessage } = require("../utils");
const generateRange = (min, max) => {
  const value = parseFloat((Math.random() * (max - min) + min).toFixed(2));
  return value;
};
// Function to log sensor data

const logData = function (data) {
  console.log(
    "Sensor ID: "
      .concat(data.sensorId, ", Data Type: ")
      .concat(data.messaggeTopic, ", Value: ")
      .concat(data.value, ", Timestamp: ")
      .concat(data.timestamp)
  );
};

const generateSensorData = ({
  sensorID,
  dataType,
  min,
  max,
  frequency,
  messaggeTopic,
}) => {
  switch (dataType) {
    case "range":
      setInterval(() => {
        const value = generateRange(min, max);
        const data = {
          sensorId: sensorID, // Humidity sensor ID
          messaggeTopic,
          value: String(value),
          timestamp: new Date().toLocaleTimeString(),
        };
        // logData(data);
        // publish data
        publishMessage(messaggeTopic, JSON.stringify(data));
      }, frequency);
      break;
    default:
  }
};

module.exports = { generateSensorData };
