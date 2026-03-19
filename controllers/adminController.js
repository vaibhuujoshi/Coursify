import generateToken from "../utils/generateToken.js";
import { signupSchema, signinSchema } from "../validators/authValidator.js";
import { adminSignup, adminSignin, getAdmin } from "../services/adminAuthService.js";

async function signupHandler(req, res) {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        await adminSignup(parsed.data);

        res.status(201).json({
            message: "Admin signed up successfully"
        })

    } catch (err) {
        if (err.message === "ADMIN_ALREADY_EXISTS") {
            return res.status(409).json({ message: err.message });
        }

        res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

async function signinHandler(req, res) {
    try {
        const parsed = signinSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        await adminSignin(parsed.data);

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
        if (err.message === "ADMIN_NOT_FOUND") {
            return res.status(404).json({ message: err.message });
        }

        if (err.message === "INVALID_PASSWORD") {
            return res.status(403).json({ message: err.message });
        }


        res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

async function getAdminHandler(req, res) {
    try {
        const admin = await getAdminById(req.user.id);

        res.status(200).json(admin);

    } catch (err) {
        if (err.message === "ADMIN_NOT_FOUND") {
            return res.status(404).json({ message: err.message });
        }

        res.status(500).json({ message: "Server error" });
    }
}

export { signupHandler, signinHandler, getAdminHandler };