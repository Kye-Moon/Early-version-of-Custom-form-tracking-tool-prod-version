import * as z from "zod";
import {InferType} from "prop-types";

export const newRecordTemplateFormSchema = z.object({
	name: z.string().min(1, {message: "template name is required"}).max(50),
	category: z.string().min(1, {message: "category is required"}).max(50),
	description: z.string().optional().nullable(),
});

export type NewRecordTemplateFormType = InferType<typeof newRecordTemplateFormSchema>;
