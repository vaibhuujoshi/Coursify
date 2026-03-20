import express from "express";
import { signinHandler, signupHandler, getAdminHandler } from "../controllers/adminController.js";
import auth from "../middleware/authMiddleware.js";
import authorization from "../middleware/authorizationMiddleware.js";
import { createCourseHandler, updateCourseHandler, deleteCourseHandler, getCoursesHandler } from "../controllers/adminCourseController.js"
import { signupLimiter, loginLimiter, adminLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", signupLimiter, signupHandler);
router.post("/signin", loginLimiter, signinHandler);
router.get("/me", auth, authorization, adminLimiter, getAdminHandler);
router.post("/course", auth, authorization, adminLimiter, createCourseHandler);
router.get("/courses", auth, authorization, adminLimiter, getCoursesHandler);
router.put("/course/:courseId", auth, authorization, adminLimiter, updateCourseHandler);
router.delete("/course/:courseId", auth, authorization, adminLimiter, deleteCourseHandler);

export default router;