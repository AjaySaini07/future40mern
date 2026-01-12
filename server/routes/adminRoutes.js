const express = require("express");
const { getAdminStats } = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

router.get("/stats", adminAuth, getAdminStats);

module.exports = router;
