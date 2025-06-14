import { z } from "zod";

export const CreateCohortDTO = z.object({
    userId: z.string().min(1, "User ID is required").optional(),
    courseId: z.string().min(1, "Course ID is required"),
    enrollmentDate: z.string().transform((str) => new Date(str)).or(z.date()).optional().default(() => new Date()),
    isActive: z.boolean().optional().default(true),
});
