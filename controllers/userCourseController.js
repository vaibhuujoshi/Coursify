import { getCourses, getACourse } from "../services/userCourseService.js";

async function getCoursesHandler(req, res) {
    try {
        const courses = await getCourses();

        res.status(200).json(courses);

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

async function getACourseHandler(req, res) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(403).json({
                message: "Provide course id"
            })
        }

        const course = await getACourse(courseId);

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

export { getCoursesHandler, getACourseHandler };