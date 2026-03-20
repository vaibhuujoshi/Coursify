import CourseModel from "../models/course.js";

async function createCourse(data, adminId) {
    const course = await CourseModel.create({
        ...data,
        creatorId: adminId
    });

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
    const courses = await CourseModel.find({}).lean();
    
    return courses;
}

export { createCourse, updateCourse, deleteCourse };