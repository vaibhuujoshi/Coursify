import express from "express";
import { signin, signup, getAdmin } from "../controllers/adminController.js";
import auth from "../middleware/authMiddleware.js";
import authorization from "../middleware/authorizationMiddleware.js";
import { course, updateCourse, deleteCourse, getCourses } from "../controllers/adminCourseController.js"
import { signupLimiter, loginLimiter, userLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", signupLimiter, signup);
router.post("/signin", loginLimiter, signin);
router.get("/me", auth, authorization, userLimiter, getAdmin);
router.post("/course", auth, authorization, userLimiter, course);
router.get("/courses", auth, authorization, userLimiter, getCourses);
router.put("/course/:courseId", auth, authorization, userLimiter, updateCourse);
router.delete("/course/:courseId", auth, authorization, userLimiter, deleteCourse);

export default router;