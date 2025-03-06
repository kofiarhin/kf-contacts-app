const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const { clearDatabase } = require("./utility/helper");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contactRoutes");
const auth = require("./middleware/auth");

//connnect to datadbase
connectDB();
// setup middlewares
app.use(cookieParser());
app.use(express.json());
// setup routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
module.exports = app;
