import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import limiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(limiter);

const MongoDB_URL = process.env.MONGODB_CON;

mongoose.connect(MongoDB_URL)
.then(() => {
    console.log("MongoDB connected");
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});