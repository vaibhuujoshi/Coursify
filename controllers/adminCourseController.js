import CourseModel from "../models/course.js";
import { createCourse, updateCourse, deleteCourse } from "../services/courseService.js";
import { courseSchema } from "../validators/courseValidator.js";

async function createCourseHandler(req, res, next) {
    try {
        const parsed = courseSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        const adminId = req.user.id;

        const result = await createCourse(parsed.data, adminId);

        res.status(201).json({
            message: "Course created successfully",
            courseId: result._id
        });

    } catch (err) {
        next(err);
    }
}

async function updateCourseHandler(req, res, next) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(400).json({
                message: "Provide course id"
            });
        }

        const parsed = courseSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid Format"
            });
        }

        const adminId = req.user.id;

        const result = await updateCourse(parsed.data, courseId, adminId);

        if (!result) {
            return res.status(403).json({
                message: "Not allowed or course does not exist"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            courseId: result._id
        });

    } catch (err) {
        next(err);
    }
}

async function deleteCourseHandler(req, res, next) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(400).json({
                message: "Provide course id"
            });
        }

        const adminId = req.user.id;

        const result = await deleteCourse(courseId, adminId)

        if (!result) {
            return res.status(403).json({
                message: "Not allowed or course does not exist"
            });
        }

        res.status(200).json({
            message: "Course deleted successfully",
            courseId: result._id
        });

    } catch (err) {
        next(err);
    }
}

async function getCourses(req, res, next) {
    try {
        const courses = await CourseModel.find({}).lean();

        if (courses.length === 0) {
            return res.status(404).json({
                message: "There are no course"
            })
        }

        res.status(200).json(courses);

    } catch (err) {
        next(err);
    }
}

export { createCourseHandler, updateCourseHandler, deleteCourseHandler, getCourses };