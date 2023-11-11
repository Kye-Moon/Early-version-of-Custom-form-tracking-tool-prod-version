import * as z from "zod";
import { InferType } from "prop-types";

export const newJobFormSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }).max(50),
	customerName: z.string().optional().nullable(),
	status: z.enum(["NOT_STARTED", "IN_PROGRESS", "FINISHED"]).optional(),
	description: z.string().optional().nullable(),
	dueDate: z.date().optional().nullable(),
	crew: z.array(z.string()).optional().nullable(),
});

export type NewJobFormType = InferType<typeof newJobFormSchema>;
