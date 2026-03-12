import express from "express";
import { signin, signup, getAdmin } from "../controllers/adminController";
import auth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, getAdmin);

export default router;