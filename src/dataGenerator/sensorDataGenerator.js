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
        logData({
          sensorId: sensorID, // Humidity sensor ID
          messaggeTopic,
          value: String(value),
          timestamp: new Date().toLocaleTimeString(),
        });
        // use publisher
      }, frequency);
  }
};

module.exports = { generateSensorData };
