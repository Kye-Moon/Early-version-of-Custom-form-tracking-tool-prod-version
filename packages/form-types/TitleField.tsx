import {z} from "zod";
import {FormElementInstance} from "./types";

export const titleFieldExtraAttributes = {
    title: "Title field",
};

export const titleFieldPropertiesSchema = z.object({
    title: z.string().min(2).max(50),
});

export type TitleFieldCustomInstance = FormElementInstance & {
    extraAttributes: typeof titleFieldExtraAttributes;
};

export type titleFieldPropertiesFormSchemaType = z.infer<typeof titleFieldPropertiesSchema>;