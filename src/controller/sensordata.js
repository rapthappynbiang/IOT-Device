const { db } = require("../config/config");
const { generateSensorData } = require("../dataGenerator/sensorDataGenerator");

const generateSensorDataController = async (req, res) => {
  try {
    const results = await db.query(`SELECT sen.sensor_id, st.sensor_type 
                       FROM iot_data_schema.sensor sen
                       JOIN iot_data_schema.sensor_type st 
                       ON st.sensor_type_id = sen.sensor_type_id
                    `);

    const sensors = results.rows;

    sensors.forEach((sensor) => {
      generateSensorData({
        sensorID: sensor.sensor_id,
        dataType: "range",
        messaggeTopic: sensor.sensor_type,
        min: 0,
        max: 100,
        frequency: sensor.sensor_type === "Temperature" ? 6000 : 3000,
      });
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("Internal Error");
  }
};

module.exports = { generateSensorDataController };