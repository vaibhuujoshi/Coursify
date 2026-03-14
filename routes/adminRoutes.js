import express from "express";
import { signin, signup, getAdmin } from "../controllers/adminController.js";
import auth from "../middleware/authMiddleware.js";
import authorization from "../middleware/authorizationMiddleware.js";
import {course, updateCourse} from "../controllers/adminCourseController.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, authorization, getAdmin);
router.post("/course", auth, authorization, course);
router.put("/course/:courseId", auth, authorization, updateCourse);

export default router;