import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import AdminModel from "../models/admin.js";
import { signupSchema, signinSchema } from "../validators/authValidator.js";

async function signup(req, res) {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
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
        const parsed = signinSchema.safeParse(req.body);

        if (!parsed.success) {
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Admin is signed in successfully"
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