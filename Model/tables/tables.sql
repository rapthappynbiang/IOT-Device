CREATE SCHEMA IF NOT EXISTS whitefield_bangalore;

-- Creating the 'facility' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.facility (
    facility_id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    address VARCHAR(150),
    latitude FLOAT,
    longitude FLOAT,
    contact_no VARCHAR(20),
    email_id VARCHAR(150)
);

-- Creating the 'building' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.building (
    building_id SERIAL PRIMARY KEY,
    building_name VARCHAR(150),
    facility_id INT,
    FOREIGN KEY (facility_id) REFERENCES whitefield_bangalore.facility(facility_id)
);

-- Creating the 'floor' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.floor (
    floor_id SERIAL PRIMARY KEY,
    floor_name VARCHAR(150),
    building_id INT,
    FOREIGN KEY (building_id) REFERENCES whitefield_bangalore.building(building_id)
);

-- Creating the 'zone' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.zone (
    zone_id SERIAL PRIMARY KEY,
    zone_name VARCHAR(150),
    floor_id INT,
    FOREIGN KEY (floor_id) REFERENCES whitefield_bangalore.floor(floor_id)
);

-- Creating the 'sensor Type' Table
-- DROP TABLE IF EXISTS whitefield_bangalore.sensor_type CASCADE;
CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_type (
    sensor_type_id SERIAL PRIMARY KEY,
    sensor_type VARCHAR(100),
    specification VARCHAR(100),
    frequency INTEGER
);

-- Creating the 'sensor' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor (
    sensor_id SERIAL PRIMARY KEY,
    zone_id INT,
    sensor_name VARCHAR(150),
    sensor_type_id INT,
    status VARCHAR(50),
    FOREIGN KEY (zone_id) REFERENCES whitefield_bangalore.zone(zone_id),
    FOREIGN KEY (sensor_type_id) REFERENCES whitefield_bangalore.sensor_type(sensor_type_id)
);

-- Creating the 'sensor data' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data (
    sensor_id INT,
    value FLOAT,
    timestamp TIMESTAMP,
    PRIMARY KEY (sensor_id, timestamp)
)  PARTITION BY RANGE (timestamp);

-- Creating the 'Alarm Configuration' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.alarm_configuration (
    alarm_config_id SERIAL PRIMARY KEY,
    alarm_severity VARCHAR(10),
    email_id VARCHAR(150),
    threshold_value VARCHAR(50),
    comparison VARCHAR(20) -- "equals"|"greaterThanEqual"|"greaterThan"|"lessThan"|"lessThanEqual"|"isNull"
);

-- sensor alarm configuration mapping
CREATE TABLE IF NOT EXISTS whitefield_bangalore.alarm_config_sensor (
    alarm_config_id INT,
    sensor_id INT,
    PRIMARY KEY (alarm_config_id, sensor_id),
    FOREIGN KEY (alarm_config_id) REFERENCES whitefield_bangalore.alarm_configuration(alarm_config_id),
    FOREIGN KEY (sensor_id) REFERENCES whitefield_bangalore.sensor(sensor_id)
);


-- Creating the 'Alarm' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.alarm (
    alarm_id SERIAL PRIMARY KEY,
    sensor_id INT,
    status VARCHAR(150),
    triggered_at TIMESTAMP,
    alarm_config_id INT,
    FOREIGN KEY (alarm_config_id) REFERENCES whitefield_bangalore.alarm_configuration(alarm_config_id)
);

-- Creating the 'Employee' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.Employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    address VARCHAR(150),
    contact_no VARCHAR(20),
    email_id VARCHAR(150),
    building_id INT,
    password TEXT,
    FOREIGN KEY (building_id) REFERENCES whitefield_bangalore.building(building_id)
);

-- Creating the 'Company' Table
CREATE TABLE IF NOT EXISTS whitefield_bangalore.Company (
    company_id SERIAL PRIMARY KEY,
    floor_id INT,
    company_name VARCHAR(150),
    FOREIGN KEY (floor_id) REFERENCES whitefield_bangalore.floor(floor_id)
);

CREATE TABLE whitefield_bangalore.role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(150)
);

CREATE TABLE whitefield_bangalore.resource(
    resource_id SERIAL PRIMARY KEY,
    resource_name VARCHAR(150) UNIQUE,
    attributes VARCHAR(100)[]
);

CREATE TABLE IF NOT EXISTS whitefield_bangalore.grant_lists (
    role_id INTEGER REFERENCES whitefield_bangalore.role(role_id),
    resource varchar(100) NOT NULL, --api - resource name
    attributes TEXT NOT NULL, -- example '*, !id,...'
    action VARCHAR(10), -- "read"|"delete"|"create","update"
    emp_id INTEGER REFERENCES whitefield_bangalore.employee(id)
);

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_01 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-01-01 00:00:00') TO ('2024-02-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_02 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-02-01 00:00:00') TO ('2024-03-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_03 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-03-01 00:00:00') TO ('2024-04-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_04 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-04-01 00:00:00') TO ('2024-05-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_05 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-05-01 00:00:00') TO ('2024-06-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_06 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-06-01 00:00:00') TO ('2024-07-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_07 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-07-01 00:00:00') TO ('2024-08-01 00:00:00');
    
CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_08 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-08-01 00:00:00') TO ('2024-09-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_09 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-09-01 00:00:00') TO ('2024-10-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_10 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-10-01 00:00:00') TO ('2024-11-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_11 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-11-01 00:00:00') TO ('2024-12-01 00:00:00');

CREATE TABLE IF NOT EXISTS whitefield_bangalore.sensor_data_2024_12 PARTITION OF whitefield_bangalore.sensor_data
    FOR VALUES FROM ('2024-12-01 00:00:00') TO ('2025-01-01 00:00:00');




