import bcrypt from "bcrypt";
import { z } from "zod";
import generateToken from "../utils/generateToken.js";
import AdminModel from "../models/admin.js";

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
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        const { email, password, firstName, lastName } = req.body;

        const admin = await AdminModel.findOne({
            email
        })

        if (admin) {
            return res.status(409).json({
                message: "Admin already exists"
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
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        const { email, password } = req.body;

        const admin = await AdminModel.findOne({
            email
        })

        if (!admin) {
            return res.status(404).json({
                message: "Admin does not exist"
            })
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Wrong password"
            })
        }

        const token = generateToken(admin._id, "admin");

        res.status(200).json({
            message: "Admin is signed in successfully",
            token
        })

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

async function getAdmin(req, res) {
    const admin = await AdminModel.findById(req.user.id).select("-password");
    res.status(200).json(admin);
}

export { signup, signin, getAdmin };