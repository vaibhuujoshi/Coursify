import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { z } from "zod";
import generateToken from "../utils/generateToken.js";
import AdminModel from "../models/admin.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function signup(req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string()
                .min(8, { message: "Password should have minimum length of 8" })
                .max(15, "Password is too long")
                .regex(/^(?=.*[A-Z]).{8,}$/, {
                    message:
                        "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
                }),
            firstName: z.string().min(1).max(100),
            lastName: z.string().min(0).max(100)
        });

        const parsedWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedWithSuccess.success) {
            return res.status(403).json({
                message: "Invalid Format"
            })
        }

        const { email, password, firstName, lastName } = req.body;

        const user = await AdminModel.findOne({
            email
        })

        if (user) {
            return res.status(409).json({
                message: "Admin already exits"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await AdminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        res.status(201).json({
            message: "Admin signed up successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

