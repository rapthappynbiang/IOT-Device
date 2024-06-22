class AlarmConfig {
  constructor() {
    this.alarmConfig = {};
    this.potentialAlarms = {};
  }

  setAlarmConfig(sensorId, config) {
    if (!this.alarmConfig[sensorId]) this.alarmConfig[sensorId] = [];
    this.alarmConfig[sensorId] = [...this.alarmConfig[sensorId], { ...config }];
  }

  getAlarmConfig(sensorId, dataCategory) {
    return this.alarmConfig[sensorId]?.find(
      (config) => config.data_category === dataCategory
    );
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

  clearPotentialAlarm(sensorId, alarmConfigId) {
    if (!this.potentialAlarms[sensorId]?.[alarmConfigId]) return;
    const newPotentialAlarms = { ...this.potentialAlarms };

    newPotentialAlarms[sensorId] = {
      ...newPotentialAlarms[sensorId],
      [alarmConfigId]: {
        count: 0,
      },
    };

    this.potentialAlarms = newPotentialAlarms;
  }

  isPotentialAlarm(sensorId, value, dataCategory) {
    if (!this.hasAlarmConfig(sensorId)) return false;

    const sensorAlarmsConfig = this.getAlarmConfig(sensorId, dataCategory);

    if (!sensorAlarmsConfig) return false;

    const checkAlarm = (config) => {
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
    };

    return checkAlarm(sensorAlarmsConfig);
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
