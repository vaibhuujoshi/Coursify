import express from "express";
import { signinHandler, signupHandler, getUserHandler } from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";
import { getCoursesHandler, getACourseHandler } from "../controllers/userCourseController.js";
import { purchaseCourseHandler, getPurchasedCoursesHandler } from "../controllers/purchaseCourseController.js";
import { signupLimiter, loginLimiter, userLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post('/signup', signupLimiter, signupHandler);
router.post('/signin', loginLimiter, signinHandler);
router.get('/me', auth, userLimiter, getUserHandler);

router.get('/courses', auth, userLimiter, getCoursesHandler);
router.get('/course/:courseId', auth, userLimiter, getACourseHandler);

router.post('/course/:courseId', auth, userLimiter, purchaseCourseHandler);
router.get('/purchasedCourses', auth, userLimiter, getPurchasedCoursesHandler);

export default router;