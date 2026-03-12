import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import UserModel from "../models/user";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

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

        const user = await UserModel.findOne({
            email
        })

        if (user) {
            return res.status(500).json({
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        res.status(201).json({
            message: "You are signed up successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }

}

async function signin(req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string()
                .min(8, { message: "Password should have minimum length of 8" })
                .max(15, "Password is too long")
                .regex(/^(?=.*[A-Z]).{8,}$/, {
                    message:
                        "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
                })
        });

        const parsedWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedWithSuccess.success) {
            return res.status(403).json({
                message: "Invalid Format"
            })
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({
            email
        })

        if (!user) {
            return res.status(403).json({
                message: "User does not exist"
            })
        }

        const passwordMatch = bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).josn({
                message: "Wrong Password"
            })
        }

        const token = generateToken(user._id, JWT_SECRET);

        res.status(200).json({
            message: "You are signed in Successfully",
            token: token
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error in server side"
        })
    }
}