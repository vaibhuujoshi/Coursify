import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    published: {type: Boolean, required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'admins'}
})

const CourseModel = mongoose.model('courses', CourseSchema);

export default CourseModel;