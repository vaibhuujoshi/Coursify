import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: { type: String, Unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String
})

const AdminModel = mongoose.model("admins", AdminSchema);

export default AdminModel;