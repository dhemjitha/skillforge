import { z } from "zod";

export const CreateCourseDTO = z.object({
    name: z.string().min(1, "Course name is required"),
    description: z.string().min(1, "Course description is required"),
    image: z.string().url("Image must be a valid URL"),
    price: z.number().min(0, "Price must be a positive number"),
    mentorName: z.string().min(1, "Mentor name is required"),
    duration: z.string().min(1, "Duration is required"),
    language: z.string().min(1, "Language is required"),
    level: z.string().min(1, "Level is required"),
});
