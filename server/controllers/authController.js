const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utility/helper");

// register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { password: noPassword, ...rest } = newUser._doc;
    return res.json(rest);
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "error", message: error.message });
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "error", message: "user not found" });
    }

    // compare password
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      return res
        .status(400)
        .json({ status: "error", message: "invalid credentials" });
    }

    const { password: noPassword, ...rest } = user._doc;
    const token = generateToken(user._id);
    res.cookie("jwt", token);
    return res.json({ ...rest, token });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// logout user
const logoutUser = async (req, res, next) => {
  res.clearCookie("jwt");
  return res.json({ messae: "logout successful" });
};

const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    return res.json(user);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: "error", message: "something went wrong" });
  }
};
const updateUser = async (req, res, next) => {
  try {
    // get id
    const { id } = req.params;
    // get user from database
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "user not found check details and try again",
      });
    }

    // update fields
    const updateFields = await User.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      { new: true }
    );

    return res.json(updateFields);
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "error", message: "internal server error" });
  }
};
const deleteUser = async (req, res, next) => {
  try {
    // get user id
    const { id } = req.params;
    // find user
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "user not found" });
    }

    await User.findByIdAndDelete(id);

    return res.json({ id });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: "error", message: "inernal server error" });
  }
};
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
};
