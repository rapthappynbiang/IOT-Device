const PORT = 3000;
const { app } = require("./app/app");
const { db } = require("./config/config");

// connect to db
db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is Listening in PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });
