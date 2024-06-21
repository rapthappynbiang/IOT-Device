const { db } = require("../config/config");
const { generateSensorData } = require("../dataGenerator/sensorDataGenerator");
const { subscribeToChannel } = require("../utils");
const { checkAlarm } = require("./alarmsController");

const generateSensorDataController = async (req, res) => {
  try {
    const results =
      await db.query(`SELECT sen.sensor_id, snrtp.sensor_type as topic, snrtp.frequency
                       FROM whitefield_bangalore.sensor as sen
                       JOIN whitefield_bangalore.sensor_type as snrtp on snrtp.sensor_type_id = sen.sensor_type_id;
                    `);

    const sensors = results.rows;

    sensors.forEach((sensor) => {
      generateSensorData({
        sensorID: sensor.sensor_id,
        dataType: "range",
        messageTopic: sensor.topic,
        min: 0,
        max: 100,
        frequency: sensor.frequency,
      });
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("Internal Error");
    console.log(JSON.stringify(error, null, 2));
  }
};

// this endpoint is responsible for subscribing to the sensor data
const subscribeTopicController = async (req, res) => {
  try {
    const results = await db.query(`SELECT sensor_type
                       FROM whitefield_bangalore.sensor_type
                    `);

    const sensorTypes = results.rows.map((item) => item.sensor_type);

    // subscribe to senosor data
    sensorTypes.map(async (type) => {
      await subscribeToChannel(type, async (message) => {
        console.log("message", message);

        if (typeof message !== "string") {
          console.log("Invalid Data Format");
          return;
        }

        const jsonData = JSON.parse(message);

        if (typeof jsonData !== "object") {
          console.log("Invalid Device data");
          return;
        }

        const { sensorId, value, messageTopic, timestamp } = jsonData;

        // check whether sensor exists or not
        const resultSensors = await db.query(
          `SELECT sensor_id FROM whitefield_bangalore.sensor 
                                       WHERE sensor_id = $1`,
          [sensorId]
        );

        const isSensorExists = resultSensors.rowCount !== 0;

        if (!isSensorExists) {
          console.log(
            "SENSOR NOT EXISTS",
            `sensor with sensor_id =${sensorId} does not exists`
          );
          return;
        }

        // parse the message and insert into sensor_data table
        await db.query(
          `INSERT INTO whitefield_bangalore.sensor_data (sensor_id, value, timestamp)
          VALUES ($1, $2, $3)`,
          [sensorId, Number(value), timestamp]
        );

        console.log(
          "DATA INSERTED SUCCESSFULLY:",
          `${messageTopic}: ${sensorId}:${value}`
        );

        // check if the alarm is configured for the sensor
        await checkAlarm(jsonData);
      });
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("Internal Error");
  }
};

module.exports = { generateSensorDataController, subscribeTopicController };
