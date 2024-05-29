const { Router } = require("express");
const {
  generateSensorDataController,
  subscribeTopicController,
} = require("../controller/sensordata");

const router = Router();

router.route("/generateData").post(generateSensorDataController);
router.route("/subscribe").post(subscribeTopicController);

module.exports = router;
