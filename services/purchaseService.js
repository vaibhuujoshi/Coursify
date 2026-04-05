import PurchaseModel from "../models/purchasedCourse.js";
import CourseModel from "../models/course.js";
import redisClient from "../config/redis.js";

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

    await redisClient.del(`user:${userId}:purchases`);

    return course;
}

async function getPurchasedCourses(userId) {
    const cacheKey = `user:${userId}:purchases`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return json.parse(cached);
    }

    const purchases = await PurchaseModel.find({ userId })
        .populate('courseId');

    const courses = purchases.map(p => p.courseId).filter(course => course !== null);
    await redisClient.setEx(cacheKey, 300, JSON.stringify(courses));
    return courses;
}

export { purchaseCourse, getPurchasedCourses };