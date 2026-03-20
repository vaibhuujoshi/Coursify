import CourseModel from "../models/course.js";

async function getCourses() {
    const courses = await CourseModel.find({}).lean();
    return courses;
}

async function getACourse(courseId) {
    const course = await CourseModel.findById(courseId);
    return course;
}

export { getCourses, getACourse };