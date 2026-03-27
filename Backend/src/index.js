require("dotenv").config({ path: "./.env" });
const app = require("./app.js");
const connectDB = require("./db/database.js");
require("./db/database.js");

// Start the server and connect to the database
const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server is listening on port:", port);
    });
  })
  .catch((err) => {
    console.log("server err:", err);
  });
