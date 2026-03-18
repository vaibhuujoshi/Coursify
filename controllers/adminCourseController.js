import CourseModel from "../models/course.js";
import { z } from "zod";

async function course(req, res) {
    try {
        const requiredBody = z.object({
            title: z.string().min(1).max(1000),
            description: z.string().min(0).max(1000),
            price: z.number().min(1),
            imageUrl: z.string().min(0).max(1000),
            published: z.boolean()
        });

        const parsedWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedWithSuccess.success) {
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        const { title, description, price, imageUrl, published } = req.body;

        const creatorId = req.user.id;

        const now = new Date();
        const createdAt = now.toLocaleString('en-IN', {
            hour12: true
        });

        const course = await CourseModel.create({
            title,
            description,
            price,
            imageUrl,
            published,
            createdAt,
            creatorId
        })

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id
        })

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
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

        const requiredBody = z.object({
            title: z.string().min(1).max(1000),
            description: z.string().min(0).max(1000),
            price: z.number().min(1),
            imageUrl: z.string().min(0).max(1000),
            published: z.boolean()
        });

        const parsed = requiredBody.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid Format"
            });
        }

        const { title, description, price, imageUrl, published } = parsed.data;

        const now = new Date();
        const updatedAt = now.toLocaleString('en-IN', { hour12: true });

        const updatedCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId, creatorId: req.user.id },
            {
                title,
                description,
                price,
                imageUrl,
                published,
                updatedAt
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
        return res.status(500).json({
            message: "There is some error from server side"
        });
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
        return res.status(500).json({
            message: "There is some error from server side"
        });
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
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}

export { course, updateCourse, deleteCourse, getCourses };