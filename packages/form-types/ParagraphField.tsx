import {ElementsType, FormElementInstance} from "form-types";
import {z} from "zod";

export const paragraphExtraAttributes = {
  text: "Text here",
};

export const  paragraphPropertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export type ParagraphCustomInstance = FormElementInstance & {
  extraAttributes: typeof paragraphExtraAttributes;
};

export type paragraphPropertiesFormSchemaType = z.infer<typeof paragraphPropertiesSchema>;