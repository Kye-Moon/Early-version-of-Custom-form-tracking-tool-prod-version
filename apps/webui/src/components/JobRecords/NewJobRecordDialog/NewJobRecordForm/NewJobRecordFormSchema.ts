import * as z from "zod";
import {InferType} from "prop-types";

export const newJobRecordFormSchema = z.object({
	jobId: z.string().min(1, { message: "Job is required" }),
	scopeRef: z.string().optional(),
	formId: z.string().min(1, { message: "Form is required" }),
	title: z.string().optional(),
	description: z.string().optional(),
	formContent: z.string().optional(),
});

export type NewJobRecordFormType = InferType<typeof newJobRecordFormSchema>;
