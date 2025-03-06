const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const {
  getContacts,
  createContact,
  clearContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.get("/", auth, getContacts);
router.get("/:contact_id", auth, getContact);
router.post("/", auth, createContact);
router.delete("/clear", clearContacts);
router.put("/:contact_id", auth, updateContact);
router.delete("/:contact_id", auth, deleteContact);
module.exports = router;
