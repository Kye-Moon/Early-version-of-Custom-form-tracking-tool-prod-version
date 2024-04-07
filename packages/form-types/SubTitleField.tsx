import {z} from "zod";
import {FormElementInstance} from "form-types";

export const SubTitleExtraAttributes = {
  title: "SubTitle field",
};

export const SubTitlePropertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export type SubTitleCustomInstance = FormElementInstance & {
  extraAttributes: typeof SubTitleExtraAttributes;
};

export type SubTitlePropertiesFormSchemaType = z.infer<typeof SubTitlePropertiesSchema>;
