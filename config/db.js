const mongoose = require("mongoose");
require("dotenv").config({ path: "../config.env" })

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL || process.env.mongoUrl;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is not configured in the environment");
  }

  await mongoose.connect(mongoUrl);
  console.log("DB connected");
};

module.exports = connectDB;