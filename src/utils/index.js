const redis = require("redis");
const nodemailer = require("nodemailer");
require("dotenv").config();

const REDIS_HOST = "localhost";
const redisClient = redis.createClient({
  socket: { host: REDIS_HOST, port: 6379 },
});
const redisSubscriber = redis.createClient({
  socket: { host: REDIS_HOST, port: 6379 },
});

// Initialize Redis clients
const connectToRedis = async () => {
  try {
    // Connect both clients and handle errors
    await redisClient.connect();
    console.log("Redis client connected");

    await redisSubscriber.connect();
    console.log("Redis subscriber connected");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
};

// Function to publish a message to a Redis channel
const publishMessage = async (channel, message) => {
  if (redisClient && redisClient.isOpen) {
    try {
      await redisClient.publish(channel, message);
      console.log(`Message published to channel ${channel}`);
    } catch (err) {
      console.error("Publish error:", err);
    }
  } else {
    console.error("Redis client not connected.");
  }
};

// Function to subscribe to a Redis channel with an async message handler
const subscribeToChannel = async (channel, messageHandler) => {
  if (redisSubscriber && redisSubscriber.isOpen) {
    try {
      await redisSubscriber.subscribe(channel, messageHandler);
      console.log(`Subscribed to channel ${channel}`);
    } catch (err) {
      console.error(`Failed to subscribe to channel ${channel}:`, err);
    }
  } else {
    console.error("Redis subscriber client not connected.");
  }
};

const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// Function to send email
const sendEmailNotification = (sensorId, value, threshold, email) => {
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Alarm Triggered",
    text: `Alarm triggered for sensor ${sensorId}: value ${value} exceeds threshold ${threshold}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Export functions after ensuring Redis connection is established
module.exports = {
  connectToRedis,
  publishMessage,
  subscribeToChannel,
  sendEmailNotification,
  getCurrentTimestamp,
};
