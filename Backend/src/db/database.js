const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

//Connect to MongoDB
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MONGODB Connected DB HOST!!!: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB connection failed!!!", err);
    process.exit(1);
  }
};

module.exports = connectDB;
