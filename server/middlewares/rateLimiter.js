const rateLimit = require("express-rate-limit");

exports.queryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // max 5 queries per IP
  message: {
    success: false,
    message: "Too many queries. Please try again later.",
  },
});
