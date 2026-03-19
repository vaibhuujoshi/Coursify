import CourseModel from "../models/course.js";
import { z } from "zod";
import { createCourse } from "../services/courseService.js";
import { courseSchema } from "../validators/courseValidator.js";

async function course(req, res) {
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

async function updateCourse(req, res) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(400).json({
                message: "Provide course id"
            });
        }

        const parsed = requiredBody.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid Format"
            });
        }

        const { title, description, price, imageUrl, published } = parsed.data;

        const updatedCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId, creatorId: req.user.id },
            {
                title,
                description,
                price,
                imageUrl,
                published
            },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(403).json({
                message: "Not allowed or course does not exist"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            courseId: updatedCourse._id
        });

    } catch (err) {
        next(err);
    }
}

async function deleteCourse(req, res) {
    try {
        const courseId = req.params.courseId;

        if (!courseId) {
            return res.status(400).json({
                message: "Provide course id"
            });
        }

        const deletedCourse = await CourseModel.findOneAndDelete({
            _id: courseId,
            creatorId: req.user.id
        });

        if (!deletedCourse) {
            return res.status(403).json({
                message: "Not allowed or course does not exist"
            });
        }

        res.status(200).json({
            message: "Course deleted successfully",
            courseId: deletedCourse._id
        });

    } catch (err) {
        next(err);
    }
}

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
        next(err);
    }
}

export { course, updateCourse, deleteCourse, getCourses };