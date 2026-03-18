import rateLimit from "express-rate-limit";
import { success } from "zod";

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many requests, ply try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export default limiter;