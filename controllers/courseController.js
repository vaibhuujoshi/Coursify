import CourseModel from "../models/course";
import { z } from "zod";

async function course(req, res) {
    try {
        const requiredBody = z.object({
            title: z.string().min(1).max(100),
            description: z.string().min(0).max(100),
            price: z.number().min(1),
            imageUrl: z.string().min(0).max(100),
            published: z.boolean
        });

        const parsedWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedWithSuccess.success) {
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        const { title, description, price, imageUrl, published } = req.body;

        const creatorId = req.user.id;

        const course = await CourseModel.create({
            title,
            description,
            price,
            imageUrl,
            published,
            creatorId
        })

        res.status(200).json({
            message: "Course created successfully"
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

        const course = await CourseModel.findOne({
            courseId
        })

        if (!course) {
            return res.status(409).json({
                message: "No such course exist"
            })
        }

        const requiredBody = z.object({
            title: z.string().min(1).max(100),
            description: z.string().min(0).max(100),
            price: z.number().min(1),
            imageUrl: z.string().min(0).max(100),
            published: z.boolean
        });

        const parsedWithSuccess = requiredBody.safeParse(req.body);

        if (!parsedWithSuccess.success) {
            return res.status(400).json({
                message: "Invalid Format"
            })
        }

        const { title, description, price, imageUrl, published } = req.body;

        const creatorId = req.user.id;

        const updatedCourse = await CourseModel.updateOne({
            _id: courseId,
            creatorId
        }, {
            title,
            description,
            price,
            imageUrl,
            published
        })

        res.status(200).json({
            message: "Course updated successfully",
            courseId: updatedCourse._id
        });

    } catch (err) {
        return res.status(500).json({
            message: "There is some error from server side"
        })
    }
}