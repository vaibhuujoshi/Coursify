import mongoose from "mongoose";

const Schema = mongoose.Schema();
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: { type: String, Unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;