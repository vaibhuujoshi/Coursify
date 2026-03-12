import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(express.json());

mongoose.connect("YOUR_MONGO_URL")
.then(() => {
    console.log("MongoDB connected");
});

app.use("/api/user", userRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});