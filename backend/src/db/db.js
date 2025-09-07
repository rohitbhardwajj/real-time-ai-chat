const mongoose = require("mongoose");
const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
  }
};

module.exports = connectDb;
