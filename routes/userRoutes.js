import express from "express";
import { signin, signup, getUser } from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/me', auth, getUser);

export default router;