const PORT = 3000;
const { app } = require("./app/app");
const { db } = require("./config/config");
const {
  connectToRedis,
  publishMessage,
  subscribeToChannel,
} = require("./utils");

let client;

// Connect to the database and Redis before starting the server
(async () => {
  try {
    // Connect to the database
    const poolClient = await db.connect();
    client = poolClient;

    // Connect to Redis
    await connectToRedis();

    // Start the application server
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });

    // Example usage of subscribeToChannel with an async message handler
    subscribeToChannel("exampleChannel", async (message) => {
      console.log("Custom handler received message:", message);
      // Simulate an asynchronous operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Async operation completed for message:", message);
    });

    // Example usage of publishMessage
    publishMessage("exampleChannel", "Hello, this is a test message!");
  } catch (err) {
    console.error("Error during server startup:", err);
  }
})();

module.exports = { client };
