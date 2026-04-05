import CourseModel from "../models/course.js";
import redisClient from "../config/redis.js";

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

async function getACourse(courseId) {
    const cacheKey = `courses:${courseId}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    const course = await CourseModel.findById(courseId);

    await redisClient.setEx(cacheKey, 600, JSON.stringify(courses));

    return course;
}

export { getCourses, getACourse };