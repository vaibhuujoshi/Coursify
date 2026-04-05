import CourseModel from "../models/course.js";
import redisClient from "../config/redis.js";

async function createCourse(data, adminId) {
    const course = await CourseModel.create({
        ...data,
        creatorId: adminId
    });

    await redisClient.del("course:all");

    return course;
}

async function updateCourse(data, courseId, adminId) {
    const courseUpdated = await CourseModel.findOneAndUpdate(
        { _id: courseId, creatorId: adminId },
        data,
        { new: true }
    )

    return courseUpdated;
}

async function deleteCourse(courseId, adminId) {
    const courseDeleted = await CourseModel.findOneAndDelete({
        _id: courseId,
        creatorId: adminId
    })

    return courseDeleted;
}

async function getCourses() {

    const cacheKey = "courses:all";

    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    const courses = await CourseModel.find({}).lean();

    await redisClient.setEx(cacheKey, 600, JSON.stringify(courses));
    
    return courses;
}

export { createCourse, updateCourse, deleteCourse, getCourses };