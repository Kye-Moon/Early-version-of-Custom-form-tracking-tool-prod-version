import {z} from "zod";
import {FormElementInstance} from "./types";

export const textFieldExtraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeHolder: "Value here...",
};

export const textFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});
export type textFieldPropertiesFormSchemaType = z.infer<typeof textFieldPropertiesSchema>;


export type TextFieldCustomInstance = FormElementInstance & {
    extraAttributes: typeof textFieldExtraAttributes;
};
