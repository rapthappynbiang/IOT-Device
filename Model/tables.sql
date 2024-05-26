CREATE SCHEMA IF NOT EXISTS iot_data_schema;
-- Creating the 'Facility' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Facility (
    facility_id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    address VARCHAR(150),
    latitude NUMBER,
    longitude NUMBER,
    contact_no VARCHAR(20),
    email_id VARCHAR(150)
);

-- Creating the 'Building' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Building (
    building_id SERIAL PRIMARY KEY,
    building_name VARCHAR(150),
    facility_id INT,
    FOREIGN KEY (facility_id) REFERENCES iot_data_schema.Facility(facility_id)
);

-- Creating the 'Floor' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Floor (
    floor_id SERIAL PRIMARY KEY,
    floor_name VARCHAR(150),
    building_id INT,
    FOREIGN KEY (building_id) REFERENCES iot_data_schema.Building(building_id)
);

-- Creating the 'Zone' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Zone (
    zone_id SERIAL PRIMARY KEY,
    zone_name VARCHAR(150),
    floor_id INT,
    FOREIGN KEY (floor_id) REFERENCES iot_data_schema.Floor(floor_id)
);

-- Creating the 'Sensor Type' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Sensor_Type (
    sensor_type_id SERIAL PRIMARY KEY,
    sensor_type VARCHAR(10),
    specification VARCHAR(10)
);

-- Creating the 'Sensor' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Sensor (
    sensor_id SERIAL PRIMARY KEY,
    zone_id INT,
    sensor_name VARCHAR(150),
    sensor_type_id INT,
    status VARCHAR(10),
    FOREIGN KEY (zone_id) REFERENCES iot_data_schema.Zone(zone_id),
    FOREIGN KEY (sensor_type_id) REFERENCES iot_data_schema.Sensor_Type(sensor_type_id)
);

-- Creating the 'Sensor Data' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Sensor_Data (
    data_id SERIAL PRIMARY KEY,
    sensor_id INT,
    value NUMBER,
    timestamp TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES iot_data_schema.Sensor(sensor_id)
);

-- Creating the 'Alarm Configuration' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Alarm_Configuration (
    alarm_config_id SERIAL PRIMARY KEY,
    alarm_severity VARCHAR(10),
    email_id VARCHAR(150),
    trigger_condition STRING,
    sensor_type_id INT,
    FOREIGN KEY (sensor_type_id) REFERENCES iot_data_schema.Sensor_Type(sensor_type_id)
);


-- Creating the 'Alarm' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Alarm (
    alarm_id SERIAL PRIMARY KEY,
    sensor_id INT,
    status VARCHAR(150),
    triggered_at TIMESTAMP,
    alarm_config_id INT,
    FOREIGN KEY (sensor_id) REFERENCES iot_data_schema.Sensor(sensor_id),
    FOREIGN KEY (alarm_config_id) REFERENCES iot_data_schema.Alarm_Configuration(alarm_config_id)
);

-- Creating the 'Employee' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    address VARCHAR(150),
    contact_no VARCHAR(20),
    email_id VARCHAR(150),
    building_id INT,
    FOREIGN KEY (building_id) REFERENCES iot_data_schema.Building(building_id)
);

-- Creating the 'Company' Table
CREATE TABLE IF NOT EXISTS iot_data_schema.Company (
    company_id SERIAL PRIMARY KEY,
    floor_id INT,
    company_name VARCHAR(150),
    FOREIGN KEY (floor_id) REFERENCES iot_data_schema.Floor(floor_id)
);
