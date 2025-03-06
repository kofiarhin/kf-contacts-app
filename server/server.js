const app = require("./app");

// setup port
const PORT = process.env.PORT || 5000;

// listen to port
app.listen(PORT, () => {
  console.log("server started");
});
