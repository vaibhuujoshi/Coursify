import CourseModel from "../models/course.js";

async function createCourse(data, adminId) {

    const now = new Date();
    const createdAt = now.toLocaleString('en-IN', {
        hour12: true
    });

    const course = await CourseModel.create({
        ...data,
        createdAt,
        creatorId: adminId
    });

    return course;
}

export { createCourse };