import * as z from "zod";
import { InferType } from "prop-types";

export const jobDetailsFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50),
    customerName: z.string().optional().nullable(),
    status: z.enum(['IN_REVIEW', 'SUBMITTED', 'APPROVED', 'REJECTED',"NO_ACTION", 'ARCHIVED']).optional(),
    description: z.string().optional().nullable(),
    type: z.enum(['VARIATION', 'NOTE', "QA", "SAFETY"]).optional(),
    flag: z.enum(['POTENTIAL', "CONFIRMED", 'IN_PROGRESS', 'COMPLETED', "HIGH_RISK", "MEDIUM_RISK", "LOW_RISK"]).optional(),
});

export type JobDetailsFormType = InferType<typeof jobDetailsFormSchema>;
