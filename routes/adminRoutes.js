import express from "express";
import { signin, signup, getAdmin } from "../controllers/adminController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, getAdmin);
// add authorization middleware for admin

export default router;