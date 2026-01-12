const express = require("express");
const router = express.Router();

const {
  getContactInfo,
  addEmail,
  // deleteEmail,
  addPhone,
  // deletePhone,
  setAddress,
  deleteContactValue,
} = require("../controllers/contactInfoController");
const { adminAuth } = require("../middlewares/adminAuth");

// 🟢 Public Routes
router.get("/", getContactInfo);

// 🔒 Admin Routes
router.post("/admin/email", adminAuth, addEmail);
// router.delete("/admin/delete/:email", adminAuth, deleteEmail);

router.post("/admin/phone", adminAuth, addPhone);
// router.delete("/admin/delete/:phone", adminAuth, deletePhone);

router.delete("/admin/delete", adminAuth, deleteContactValue);

router.post("/admin/address", adminAuth, setAddress);

module.exports = router;
