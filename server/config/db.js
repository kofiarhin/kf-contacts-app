const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_LOCAL || "mongodb://localhost:27017/test";
    const conn = await mongoose.connect(mongoURI);
    console.log(conn.connection.host);
  } catch (error) {
    process.exit(1);
    console.log(error.message);
  }
};

module.exports = connectDB;
