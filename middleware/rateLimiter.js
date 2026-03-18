import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many requests, please try again later."
        })
    }
})

const userLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,

    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "User rate limit exceeded. Try again later."
        })
    }
})

const adminLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 500,

    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Admin rate limit exceeded. Try again later."
        })
    }
})

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 5,
    skipSuccessfulRequests: true,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many login attempts. Try again later."
        });
    }
});

const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: "Too many accounts created from this IP."
        });
    }
});

export { apiLimiter, userLimiter, loginLimiter, signupLimiter, adminLimiter };