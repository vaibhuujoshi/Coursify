import PurchaseModel from "../models/purchasedCourse.js";
import CourseModel from "../models/course.js";

async function purchaseCourse(req, res) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(403).json({
                message: "Provide course id"
            })
        }

        const userId = req.user.id;

        const purchased = await PurchaseModel.findOne({
            userId, courseId
        }).select("_id");

        if (purchased) {
            return res.status(400).json({
                message: "You have already purchased this course"
            })
        }

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "No such course exist"
            })
        }

        const now = new Date();
        const purchasedAt = now.toLocaleString('en-IN', {
            hour12: true
        });

        await PurchaseModel.create({
            userId,
            courseId,
            purchasedAt
        })

        res.status(201).json({
            message: "Course purchased successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

async function getPurchasedCourses(req, res) {
    try {
        const userId = req.user.id;
        const purchases = await PurchaseModel.find({ userId });
        const courseIds = purchases.map(p => p.courseId);

        const courses = await CourseModel.find({
            _id: { $in: courseIds }
        });

        if (courses.length === 0) {
            return res.status(404).json({
                message: "There are no purchased course"
            })
        }

        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

export { purchaseCourse, getPurchasedCourses };