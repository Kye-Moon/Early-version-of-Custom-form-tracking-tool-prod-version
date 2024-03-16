import * as z from "zod";
import { InferType } from "prop-types";

export const editProjectFormSchema = z.object({
	title: z.string().min(1, { message: "Title is required" }).max(50),
	customer: z.string().optional().nullable(),
	status: z.enum(["UPCOMING", "IN_PROGRESS", "COMPLETED","ARCHIVED"]).optional(),
	description: z.string().optional().nullable(),
});

export type EditProjectFormType = InferType<typeof editProjectFormSchema>;
