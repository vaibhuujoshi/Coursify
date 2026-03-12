import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const MongoDB_URL = process.env.MONGODB_CON;

mongoose.connect(MongoDB_URL)
.then(() => {
    console.log("MongoDB connected");
});

app.use("/api/user", userRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});