import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PurchasedCourseSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    courseId: {type: Schema.Types.ObjectId, ref: 'courses'},
    purchasedAt : {type: String, required: true}
})

const PurchaseModel = mongoose.model('purchasedCourses', PurchasedCourseSchema);

export default PurchaseModel;