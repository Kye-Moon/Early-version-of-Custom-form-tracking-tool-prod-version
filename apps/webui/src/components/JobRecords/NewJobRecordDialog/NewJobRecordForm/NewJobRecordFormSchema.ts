import * as z from "zod";
import {InferType} from "prop-types";

export const newJobRecordFormSchema = z.object({
	jobId: z.string().min(1, { message: "Job is required" }),
	scopeRef: z.string().optional(),
	type: z.string().min(1, { message: "Type is required" }),
	title: z.string().min(1, { message: "Title is required" }).max(50),
	description: z.string().optional(),

	//Variation additional fields
	hours: z.string().max(1000).optional().nullable(),
	numPeople: z.string().max(1000).optional().nullable(),
	who: z.string().max(50).optional(),
	materials: z.string().max(500).optional(),
	equipment: z.string().max(500).optional(),

	//
	flag: z.string().optional(),
});

export type NewJobRecordFormType = InferType<typeof newJobRecordFormSchema>;
