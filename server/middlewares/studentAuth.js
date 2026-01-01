//------------------------ middlewares/studentAuth.js ------------------------
const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");

exports.studentAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await studentModel.findById(decoded.id);
    if (!student) {
      return res.status(401).json({ message: "Student not found" });
    }

    req.user = {
      id: student._id,
      role: "student",
      FullName: student.fullName,
      Email: student.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
