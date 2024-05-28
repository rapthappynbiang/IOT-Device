// Function to generate temperature data
var generateTemperature = function () {
  var temperature = parseFloat((Math.random() * (30 - 20) + 20).toFixed(2)); // Temperature between 20°C and 30°C
  return {
    sensorId: 1, // Temperature sensor ID
    type: "Temperature",
    value: "".concat(temperature, "\u00B0C"),
    timestamp: new Date().toLocaleTimeString(),
  };
};
// Function to generate humidity data
var generateHumidity = function () {
  var humidity = parseFloat((Math.random() * (90 - 30) + 30).toFixed(2)); // Humidity between 30% and 90%
  return {
    sensorId: 2, // Humidity sensor ID
    type: "Humidity",
    value: "".concat(humidity, "%"),
    timestamp: new Date().toLocaleTimeString(),
  };
};

// const generateSensorData = ({sensorID, dataType, min, max, frequency})=>{
//     var humidity = parseFloat((Math.random() * (90 - 30) + 30).toFixed(2)); // Humidity between 30% and 90%
//     return {
//       sensorId: 2, // Humidity sensor ID
//       type: "Humidity",
//       value: "".concat(humidity, "%"),
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     switch(datatype){
//         case ""
//     }
// }

// Function to log sensor data
var logData = function (data) {
  console.log(
    "Sensor ID: "
      .concat(data.sensorId, ", Data Type: ")
      .concat(data.type, ", Value: ")
      .concat(data.value, ", Timestamp: ")
      .concat(data.timestamp)
  );
};
// Set intervals for generating and logging temperature and humidity data
setInterval(function () {
  return logData(generateTemperature());
}, 5000); // Every 60 seconds for temperature
setInterval(function () {
  return logData(generateHumidity());
}, 1000); // Every 30 seconds for humidity
