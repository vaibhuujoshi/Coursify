import PurchaseModel from "../models/purchasedCourse.js";
import CourseModel from "../models/course.js";

async function purchaseCourse(userId, courseId) {
    const purchased = await PurchaseModel.findOne({
        userId, courseId
    }).select("_id");

    if (purchased) {
        throw new Error("COURSE_ALREADY_PURCHASED");
    }

    const courseExist = await CourseModel.findById(courseId);

    if (!courseExist) {
        throw new Error("COURSE_NOT_EXIST");
    }

    const now = new Date();
    const purchasedAt = now.toLocaleString('en-IN', {
        hour12: true
    });

    const course = await PurchaseModel.create({
        userId,
        courseId,
        purchasedAt
    })

    return course;
}

async function getPurchasedCourses(userId) {
    const purchases = await PurchaseModel.find({ userId });

    const courseIds = purchases.map(p => p.courseId);

    const courses = await CourseModel.find({
        _id: { $in: courseIds }
    });

    return courses;
}

export { purchaseCourse, getPurchasedCourses };