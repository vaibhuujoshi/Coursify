import express from "express";
import { signin, signup, getAdmin } from "../controllers/adminController.js";
import auth from "../middleware/authMiddleware.js";
import authorization from "../middleware/authorizationMiddleware.js";
import { course, updateCourse, deleteCourse, getCourses } from "../controllers/adminCourseController.js"
import { signupLimiter, loginLimiter, adminLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", signupLimiter, signup);
router.post("/signin", loginLimiter, signin);
router.get("/me", auth, authorization, adminLimiter, getAdmin);
router.post("/course", auth, authorization, adminLimiter, course);
router.get("/courses", auth, authorization, adminLimiter, getCourses);
router.put("/course/:courseId", auth, authorization, adminLimiter, updateCourse);
router.delete("/course/:courseId", auth, authorization, adminLimiter, deleteCourse);

export default router;