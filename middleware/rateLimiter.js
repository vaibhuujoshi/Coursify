import rateLimit from "express-rate-limit";
import rateLimitStore from "../config/rateLimitStore.js";

const keyGenerator = (req) => {
  if (req.user?.id) {
    return `user:${req.user.id}`;
  }
  return `ip:${req.ip}`;
};

const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    store: rateLimitStore,

    handler: (req, res) => {
        console.warn("API rate limit hit:", req.ip);
        return res.status(429).json({
            success: false,
            message: "Too many requests, please try again later."
        })
    }
})

const userLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  keyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  store: rateLimitStore,

  handler: (req, res) => {
    console.warn("User rate limit hit:", req.user?.id || req.ip);
    return res.status(429).json({
      success: false,
      message: "User rate limit exceeded.",
    });
  },
});

const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 200,
  keyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  store: rateLimitStore,

  handler: (req, res) => {
    console.warn("Admin rate limit hit:", req.user?.id);
    return res.status(429).json({
      success: false,
      message: "Admin rate limit exceeded.",
    });
  },
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  keyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  store: rateLimitStore,

  handler: (req, res) => {
    console.warn("Login abuse detected:", req.ip);
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again later.",
    });
  },
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyGenerator,
  standardHeaders: true,
  legacyHeaders: false,
  store: rateLimitStore,

  handler: (req, res) => {
    console.warn("Signup abuse detected:", req.ip);
    return res.status(429).json({
      success: false,
      message: "Too many accounts created.",
    });
  },
});

export { apiLimiter, userLimiter, loginLimiter, signupLimiter, adminLimiter };