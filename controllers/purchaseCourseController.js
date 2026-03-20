import { purchaseCourse, getPurchasedCourses } from "../services/purchaseService.js";

async function purchaseCourseHandler(req, res) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(403).json({
                message: "Provide course id"
            })
        }

        const userId = req.user.id;

        await purchaseCourse(userId, courseId);

        res.status(201).json({
            message: "Course purchased successfully"
        })

    } catch (err) {

        if (err.message === "COURSE_ALREADY_PURCHASED") {
            return res.status(400).json({
                message: "You have already purchased this course"
            })
        } else if (err.message === "COURSE_NOT_EXIST") {
            return res.status(404).json({
                message: "No such course exist"
            })
        }

        res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

async function getPurchasedCoursesHandler(req, res) {
    try {
        const userId = req.user.id;
        
        const courses = await getPurchasedCourses(userId);

        res.status(200).json(courses);

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

export { purchaseCourseHandler, getPurchasedCoursesHandler };