import {FormElementInstance} from "form-types";
import {z} from "zod";

export const TextAreaExtraAttributes = {
  label: "Text area",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
  rows: 3,
};

export const TextAreaPropertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export type TextAreaCustomInstance = FormElementInstance & {
  extraAttributes: typeof TextAreaExtraAttributes;
};


export type TextAreaPropertiesFormSchemaType = z.infer<typeof TextAreaPropertiesSchema>;

