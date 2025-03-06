const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/:id", auth, getUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
module.exports = router;
