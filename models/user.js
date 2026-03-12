import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, Unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;