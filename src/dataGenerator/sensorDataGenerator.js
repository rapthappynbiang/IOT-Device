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
  messageTopic,
}) => {
  switch (dataType) {
    case "range":
      setInterval(() => {
        function getCurrentTimestamp() {
          const now = new Date();

          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
          const day = String(now.getDate()).padStart(2, "0");
          const hours = String(now.getHours()).padStart(2, "0");
          const minutes = String(now.getMinutes()).padStart(2, "0");
          const seconds = String(now.getSeconds()).padStart(2, "0");

          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        // Example usage:
        const timestamp = getCurrentTimestamp();
        const value = generateRange(min, max);
        const data = {
          sensorId: sensorID, // Humidity sensor ID
          messageTopic,
          value: String(value),
          timestamp,
        };
        // logData(data);
        // publish data
        publishMessage(messageTopic, JSON.stringify(data));
      }, frequency);
      break;
    default:
  }
};

module.exports = { generateSensorData };
