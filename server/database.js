const mongoose = require("mongoose");

const databaseConnection = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/bookstore", {
    })
    .then(() => {
      console.log("✅ Database connected successfully");
    })
    .catch((error) => {
      console.error("❌ Database connection error:", error);
    });
};

module.exports = databaseConnection;
