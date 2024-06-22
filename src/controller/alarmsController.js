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
                              ac.data_category,
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
      `INSERT INTO whitefield_bangalore.alarm (sensor_id, status, triggered_at, alarm_config_id, data_category, value) 
       VAlUES($1, $2, $3, $4, $5, $6);`,
      [
        alarmDetail.sensor_id,
        "Triggered",
        timestamp,
        alarmDetail.alarm_config_id,
        alarmDetail.data_category,
        value,
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

const updateAlarmValue = async (value, alarm) => {
  try {
    await db.query(
      `UPDATE whitefield_bangalore.alarm SET value = $1 
       WHERE alarm_config_id = $2`,
      [String(value), alarm.alarm_config_id]
    );
    console.log("ALARMS UPDATED SUCCESSFULLY");
  } catch (error) {
    console.log("FAILED TO INSERT ALARM", JSON.stringify(error, null, 2));
  }
};

const clearAlarm = async (alarm) => {
  try {
    await db.query(`BEGIN;`);
    await db.query(
      `DELETE FROM whitefield_bangalore.alarm where alarm_id=$1;`,
      [alarm.alarm_id]
    );
    await db.query(
      `INSERT INTO whitefield_bangalore.alarm_history (sensor_id, status, triggered_at,data_category, alarm_config_id, value)
                    VALUES ($1, $2, $3, $4, $5, $6);`,
      [
        alarm.sensor_id,
        "Cleared",
        alarm.triggered_at,
        alarm.data_category,
        alarm.alarm_config_id,
        alarm.value,
      ]
    );
    await db.query(`COMMIT;`);
    console.log("ALARM CLEARED SUCCESSFULLY");
  } catch (error) {
    await db.query(`ROLLBACK;`);
    console.log("INTERNAL SERVER ERROR", error);
  }
};

const checkAlarm = async (sensorData) => {
  const { sensorId, value, messageTopic } = sensorData;
  try {
    // check if the alarm is configured for the sensor
    const hasAlarmConfigured = alarmConfig.hasAlarmConfig(sensorId);

    if (!hasAlarmConfigured) return;

    const isPotentialAlarm = alarmConfig.isPotentialAlarm(
      sensorId,
      value,
      messageTopic
    );

    const sensorAlarm = alarmConfig.getAlarmConfig(sensorId, messageTopic);

    if (!sensorAlarm) return;

    // if not a potentialAlarm
    if (!isPotentialAlarm) {
      // check if the alarm has been triggered earlier if then clear/reset the alarm
      const res = await db.query(
        `SELECT * FROM whitefield_bangalore.alarm where alarm_config_id=$1`,
        [sensorAlarm.alarm_config_id]
      );

      if (res.rowCount === 0) return;

      await clearAlarm(res.rows[0]);
      alarmConfig.clearPotentialAlarm(sensorId, sensorAlarm.alarm_config_id);

      return;
    }

    const isAlarm = alarmConfig.isAlarm(
      sensorId,
      sensorAlarm.alarm_config_id,
      1
    );

    // if is alarm inseert alarm ito table
    if (isAlarm) {
      // check if alram already exists
      const res = await db.query(
        `SELECT EXISTS(SELECT 1 FROM whitefield_bangalore.alarm WHERE alarm_config_id=$1)`,
        [sensorAlarm.alarm_config_id]
      );

      // if alarm already exists update alarm
      if (res.rowCount > 0 && res.rows[0].exists) {
        await updateAlarmValue(value, sensorAlarm);
        return;
      }

      await addAlarm(sensorAlarm, value);
      return;
    }

    // update the alarm count if it is a potential alarm
    alarmConfig.setPotentialAlarm(sensorId, sensorAlarm);
  } catch (error) {
    console.log("Error");
  }
};

module.exports = { subScribeToAlarms, addAlarm, checkAlarm };
