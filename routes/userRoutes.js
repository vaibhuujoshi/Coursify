import express from "express";
import { signin, signup, getUser } from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";
import { getCourses, getACourse } from "../controllers/userCourseController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', auth, getUser);

router.get('/courses', auth, getCourses);
router.get('/course/:courseId', auth, getACourse);

export default router;