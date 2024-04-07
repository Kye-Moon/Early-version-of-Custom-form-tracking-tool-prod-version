import {z} from "zod";
import {ElementsType, FormElementInstance} from "form-types";

export const numberExtraAttributes = {
  label: "Number field",
  helperText: "Helper text",
  required: false,
  placeHolder: "0",
};

export const numberPropertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

export type NumberCustomInstance = FormElementInstance & {
  extraAttributes: typeof numberExtraAttributes;
};

export type numberPropertiesFormSchemaType = z.infer<typeof numberPropertiesSchema>;