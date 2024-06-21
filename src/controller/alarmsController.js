const { db } = require("../config/config");
const { getCurrentTimestamp, sendEmailNotification } = require("../utils");
const { alarmConfig } = require("../utils/alarms");

const subScribeToAlarms = async () => {
  try {
    const res = await db.query(`SELECT 
                              ac.alarm_config_id,
                              ac.alarm_severity,
                              ac.email_id,
                              ac.threshold_value,
                              ac.comparison,
                              acs.sensor_id
                            FROM 
                              whitefield_bangalore.alarm_configuration ac
                            JOIN 
                              whitefield_bangalore.alarm_config_sensor acs
                            ON 
                              ac.alarm_config_id = acs.alarm_config_id;`);
    res.rows.forEach((row) => {
      alarmConfig.setAlarmConfig(row.sensor_id, row);
    });
    console.log("ALARMS SUBSCRIBED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
  }
};

const addAlarm = async (alarmDetail, value) => {
  try {
    const timestamp = getCurrentTimestamp();
    await db.query(
      `INSERT INTO whitefield_bangalore.alarm (sensor_id, status, triggered_at, alarm_config_id) 
       VAlUES($1, $2, $3, $4);`,
      [
        alarmDetail.sensor_id,
        "Triggered",
        timestamp,
        alarmDetail.alarm_config_id,
      ]
    );

    sendEmailNotification(
      alarmDetail.sensor_id,
      value,
      alarmDetail.threshold_value,
      alarmDetail.email_id
    );
    console.log("ALARMS CREATED SUCCESSFULLY");
  } catch (error) {
    console.log("FAILED TO INSERT ALARM", JSON.stringify(error, null, 2));
  }
};

const checkAlarm = async (sensorData) => {
  const { sensorId, value, messageTopic, timestamp } = sensorData;
  try {
    // check if the alarm is configured for the sensor
    const hasAlarmConfigured = alarmConfig.hasAlarmConfig(sensorId);

    if (!hasAlarmConfigured) return;

    const potentialAlarm = alarmConfig.getPotentialAlarm(sensorId, value);

    // ifnot a potentialAlarm
    if (!potentialAlarm.isPotentialAlarm) return;

    const isAlarm = alarmConfig.isAlarm(
      sensorId,
      potentialAlarm.sensorAlarm.alarm_config_id,
      1
    );

    // if is alarm inseert alarm ito table
    if (isAlarm) {
      await addAlarm(potentialAlarm.sensorAlarm, value);
      return;
    }

    // update the alarm count if it is a potential alarm
    alarmConfig.setPotentialAlarm(sensorId, potentialAlarm.sensorAlarm);
  } catch (error) {
    console.log("Error");
  }
};

module.exports = { subScribeToAlarms, addAlarm, checkAlarm };
