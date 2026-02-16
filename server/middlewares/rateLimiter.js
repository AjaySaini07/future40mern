// const rateLimit = require("express-rate-limit");

// exports.queryLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 5, // max 5 queries per IP
//   message: {
//     success: false,
//     message: "Too many queries. Please try again later.",
//   },
// });

const rateLimit = require("express-rate-limit");

/* ------------------- GENERAL LIMIT ------------------- */
const generalLimiter = rateLimit({
  // windowMs: 1 * 60 * 1000, // 1 minutes
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* --------------------- AUTH LIMIT --------------------- */
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 login/signup attempts per IP
  message: {
    success: false,
    message: "Too many attempts. Please try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ---------------------- OTP LIMIT ---------------------- */
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 3 OTP requests per IP
  message: {
    success: false,
    message: "Too many OTP requests. Please wait 5 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/* --------------------- QUERY LIMIT ---------------------- */
const queryLimiter = rateLimit({
  // windowMs: 10 * 60 * 1000, // 10 minutes
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 5, // max 5 queries per IP
  message: {
    success: false,
    message: "Too many queries. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  authLimiter,
  otpLimiter,
  queryLimiter,
};
