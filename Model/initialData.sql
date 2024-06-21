INSERT INTO whitefield_bangalore.Facility (facility_id, name, address, latitude, longitude, contact_no, email_id) VALUES
(1, 'Main Facility', '123 Main St, Anytown, USA', 35.6895, 139.6917, '123-456-7890', 'contact@mainfacility.com'),
(2, 'Secondary Facility', '456 Side St, Othertown, USA', 34.0522, -118.2437, '987-654-3210', 'info@secondaryfacility.com');

INSERT INTO whitefield_bangalore.Building (building_id, building_name, facility_id) VALUES
(1, 'Building One', 1),
(2, 'Building Two', 2);

INSERT INTO whitefield_bangalore.Floor (floor_id, floor_name, building_id) VALUES
(1, 'First Floor', 1),
(2, 'Second Floor', 1),
(3, 'Third Floor', 2);

INSERT INTO whitefield_bangalore.Zone (zone_id, zone_name, floor_id) VALUES
(1, 'North Wing', 1),
(2, 'South Wing', 1),
(3, 'East Wing', 2),
(4, 'West Wing', 3);

INSERT INTO whitefield_bangalore.Sensor_Type (sensor_type_id, sensor_type, specification, frequency) VALUES
(1, 'Temperature', 'High Accuracy',20000),
(2, 'Humidity', 'Standard Range',10000);

INSERT INTO whitefield_bangalore.Sensor (sensor_id, zone_id, sensor_name, sensor_type_id, status) VALUES
(1, 1, 'Temp Sensor 1', 1, 'Active'),
(2, 2, 'Humidity Sensor 1', 2, 'Inactive');

INSERT INTO whitefield_bangalore.Alarm_Configuration (alarm_config_id, alarm_severity, email_id, threshold_value, comparison) VALUES
(1, 'High', 'alerts@mainfacility.com', '70', 'greaterThan'),
(2, 'Medium', 'alerts@secondaryfacility.com', '40', 'lessThan');

INSERT INTO whitefield_bangalore.alarm_config_sensor (alarm_config_id, sensor_id) VALUES
(1, 1),
(2, 2);

INSERT INTO whitefield_bangalore.Alarm (alarm_id, sensor_id, status, triggered_at, alarm_config_id) VALUES
(1, 1, 'Triggered', '2023-01-01 10:05:00', 1),
(2, 2, 'Cleared', '2023-01-01 11:05:00', 2);

INSERT INTO whitefield_bangalore.Employee (id, name, address, contact_no, email_id, building_id) VALUES
(1, 'John Doe', '123 Main St, Anytown, USA', '123-456-7890', 'johndoe@mainfacility.com', 1),
(2, 'Jane Smith', '456 Side St, Othertown, USA', '987-654-3210', 'janesmith@secondaryfacility.com', 2);

INSERT INTO whitefield_bangalore.Company (company_id, floor_id, company_name) VALUES
(1, 1, 'Tech Innovators'),
(2, 3, 'Health Solutions');