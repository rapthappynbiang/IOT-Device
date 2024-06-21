class AlarmConfig {
  constructor() {
    this.alarmConfig = {};
    this.potentialAlarms = {};
  }

  setAlarmConfig(sensorId, config) {
    if (!this.alarmConfig[sensorId]) this.alarmConfig[sensorId] = [];
    this.alarmConfig[sensorId] = [...this.alarmConfig[sensorId], { ...config }];
  }

  getAlarmConfig(sensorId) {
    return this.alarmConfig[sensorId];
  }

  hasAlarmConfig(sensorId) {
    return this.alarmConfig.hasOwnProperty(sensorId);
  }

  setPotentialAlarm(sensorId, alarmDetails) {
    const newPotentialAlarms = { ...this.potentialAlarms };
    if (!newPotentialAlarms[sensorId]) {
      newPotentialAlarms[sensorId] = {
        [alarmDetails.alarm_config_id]: 0,
      };
    }

    let count =
      newPotentialAlarms[sensorId][alarmDetails.alarm_config_id].count ?? 0;

    newPotentialAlarms[sensorId] = {
      ...newPotentialAlarms[sensorId],
      [alarmDetails.alarm_config_id]: {
        count: (count += 1),
      },
    };

    this.potentialAlarms = newPotentialAlarms;
  }

  getPotentialAlarm(sensorId, value) {
    if (!this.hasAlarmConfig(sensorId))
      return { isPotentialAlarm: false, sensorAlarm: undefined };

    const sensorAlarmsConfig = this.getAlarmConfig(sensorId);

    if (sensorAlarmsConfig.length === 0)
      return { isPotentialAlarm: false, sensorAlarm: undefined };

    let sensorAlarm = sensorAlarmsConfig.find((config) => {
      if (config.comparison === "equals")
        return String(value) === config.threshold_value;
      if (config.comparison === "not_equals")
        return String(value) !== config.threshold_value;
      if (config.comparison === "greaterThan")
        return Number(value) > Number(config.threshold_value);
      if (config.comparison === "lessThan")
        return Number(value) < Number(config.threshold_value);
      if (config.comparison === "greaterThanOrEqual")
        return Number(value) >= Number(config.threshold_value);
      if (config.comparison === "lessThanOrEqual")
        return Number(value) <= Number(config.threshold_value);
    });

    return { isPotentialAlarm: Boolean(sensorAlarm), sensorAlarm };
  }

  isAlarm(sensorId, alarmConfigId, count) {
    if (
      !this.hasAlarmConfig(sensorId) ||
      !this.potentialAlarms[sensorId] ||
      !this.potentialAlarms[sensorId]?.[alarmConfigId]
    )
      return false;

    if (this.potentialAlarms?.[sensorId]?.[alarmConfigId].count >= count)
      return true;

    return false;
  }
}

const alarmConfig = new AlarmConfig();

module.exports = { alarmConfig };
