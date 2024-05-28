const { Router } = require("express");
const { generateSensorDataController } = require("../controller/sensordata");

const router = Router();

router.route("/generateData").post(generateSensorDataController);
router.route("/subscribe").post(generateSensorDataController);

module.exports = router;
