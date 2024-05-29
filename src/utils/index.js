const redis = require("redis");

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

// Export functions after ensuring Redis connection is established
module.exports = {
  connectToRedis,
  publishMessage,
  subscribeToChannel,
};
