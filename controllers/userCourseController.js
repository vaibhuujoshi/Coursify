import CourseModel from "../models/course.js";
import PurchasedCourseModel from "../models/purchasedCourse.js";

async function getCourses(req, res) {
    try {
        const courses = await CourseModel.find({}).lean();

        if (courses.length === 0) {
            return res.status(404).json({
                message: "There are no course"
            })
        }

        res.status(200).json(courses);

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}