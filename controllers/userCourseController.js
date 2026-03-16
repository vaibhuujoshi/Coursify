import CourseModel from "../models/course.js";

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

async function getACourse(req, res) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(403).json({
                message: "Provide course id"
            })
        }

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "No such course exist"
            })
        }

        res.status(200).json(course);

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}