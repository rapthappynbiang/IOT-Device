// Define a type for SensorData to ensure type safety
type SensorData = {
  sensorId: number;
  type: string;
  value: string;
  timestamp: string;
};

// Function to generate temperature data
const generateTemperature = (): SensorData => {
  const temperature: number = parseFloat(
    (Math.random() * (30 - 20) + 20).toFixed(2)
  ); // Temperature between 20°C and 30°C
  return {
    sensorId: 1, // Temperature sensor ID
    type: "Temperature",
    value: `${temperature}°C`,
    timestamp: new Date().toLocaleTimeString(),
  };
};

// Function to generate humidity data
const generateHumidity = (): SensorData => {
  const humidity: number = parseFloat(
    (Math.random() * (90 - 30) + 30).toFixed(2)
  ); // Humidity between 30% and 90%
  return {
    sensorId: 2, // Humidity sensor ID
    type: "Humidity",
    value: `${humidity}%`,
    timestamp: new Date().toLocaleTimeString(),
  };
};

// Function to log sensor data
const logData = (data: SensorData) => {
  console.log(
    `Sensor ID: ${data.sensorId}, Data Type: ${data.type}, Value: ${data.value}, Timestamp: ${data.timestamp}`
  );
};

// Set intervals for generating and logging temperature and humidity data
setInterval(() => logData(generateTemperature()), 5000); // Every 60 seconds for temperature
setInterval(() => logData(generateHumidity()), 1000); // Every 30 seconds for humidity
