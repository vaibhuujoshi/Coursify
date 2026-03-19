import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { signupSchema, signinSchema } from "../validators/authValidator.js";

async function signupHandler(req, res) {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(403).json({
                message: "Invalid Format"
            })
        }

        const { email, password, firstName, lastName } = req.body;

        const user = await UserModel.findOne({
            email
        })

        if (user) {
            return res.status(409).json({
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

async function signinHandler(req, res) {
    try {
        const parsed = signinSchema.safeParse(req.body);

        if (!parsed.success) {
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

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Wrong Password"
            })
        }

        const token = generateToken(user._id, "user");
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })

        res.status(200).json({
            message: "You are signed in Successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error in server side"
        })
    }
}

async function getUserHandler(req, res) {
    const user = await UserModel.findById(req.user.id).select("-password");
    res.status(200).json(user);
}

export { signinHandler, signupHandler, getUserHandler };