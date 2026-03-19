import AdminModel from "../models/admin.js";
import bcrypt from "bcrypt";

async function adminSignup(data) {
    const { email, password, firstName, lastName } = data;

    const existingAdmin = await AdminModel.findOne({ email })

    if (existingAdmin) {
        throw new Error("ADMIN_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    })

    return admin;
}

async function adminSignin(data) {
    const { email, password } = data;

    const admin = await AdminModel.findOne({
        email
    })

    if (!admin) {
        throw new Error("ADMIN_NOT_FOUND");
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
        throw new Error("INVALID_PASSWORD");
    }

    return admin;
}

async function getAdmin(adminId) {
    const admin = await AdminModel.findById(adminId).select("-password");

    if (!admin) {
        throw new Error("ADMIN_NOT_FOUND");
    }

    return admin;
}

export { adminSignup, adminSignin, getAdmin };