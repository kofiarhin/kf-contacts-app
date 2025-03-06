const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  let token;
  try {
    token = req.cookies.jwt;
    if (!token) {
      return res.json({
        status: "error",
        message: "unauthorized user. No token",
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res.json({
        status: "error",
        message: "unauthorized: invalid token",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "unauthorized access: user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
};

module.exports = auth;
