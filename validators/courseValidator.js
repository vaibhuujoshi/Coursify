import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(1).max(1000),
    description: z.string().min(0).max(1000),
    price: z.number().min(1),
    imageUrl: z.string().min(0).max(1000),
    published: z.boolean()
})