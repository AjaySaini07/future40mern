// const jwt = require("jsonwebtoken");
// const studentModel = require("../models/studentModel");

// // Token Verification
// exports.authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const student = await studentModel
//       .findById(decoded.id)
//       .select("_id fullName email");

//     if (!student) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = student;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         message: "Token expired, please login again",
//         code: "TOKEN_EXPIRED",
//       });
//     }

//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         message: "Invalid token",
//         code: "INVALID_TOKEN",
//       });
//     }

//     return res.status(401).json({
//       message: "Authentication failed",
//     });
//   }
// };

// // ADMIN ONLY
// exports.adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       message: "Access denied — Admin only",
//     });
//   }
//   next();
// };
