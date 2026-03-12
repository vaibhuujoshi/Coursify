import express from "express";
import { signin, signup, getUser } from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', auth, getUser);

export default router;