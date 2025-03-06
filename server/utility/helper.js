const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const clearDatabase = async () => {
  console.log("clear database");
  await User.deleteMany();
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  clearDatabase,
  generateToken,
};
