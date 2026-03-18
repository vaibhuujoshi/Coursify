import express from "express";
import { signin, signup, getUser } from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";
import { getCourses, getACourse } from "../controllers/userCourseController.js";
import { purchaseCourse, getPurchasedCourses } from "../controllers/purchaseCourseController.js";
import { signupLimiter, loginLimiter, userLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post('/signup', signupLimiter, signup);
router.post('/signin', loginLimiter, signin);
router.get('/me', auth, userLimiter, getUser);

router.get('/courses', auth, userLimiter, getCourses);
router.get('/course/:courseId', auth, userLimiter, getACourse);

router.post('/course/:courseId', auth, userLimiter, purchaseCourse);
router.get('/purchasedCourses', auth, userLimiter, getPurchasedCourses);

export default router;