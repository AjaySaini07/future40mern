const express = require("express");
const {
  signup,
  login,
  changePassword,
} = require("../controllers/authController");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/admin/change-password", adminAuth, changePassword);

module.exports = router;
