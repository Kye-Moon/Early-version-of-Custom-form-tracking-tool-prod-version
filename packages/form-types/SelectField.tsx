import {FormElementInstance} from "form-types";
import {z} from "zod";

export const SelectExtraAttributes = {
    label: "Select field",
    helperText: "Helper text",
    required: false,
    placeHolder: "Value here...",
    options: [],
};

export const selectPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    options: z.array(z.string()).default([]),
});


export type SelectCustomInstance = FormElementInstance & {
    extraAttributes: typeof SelectExtraAttributes;
};


export type selectPropertiesFormSchemaType = z.infer<typeof selectPropertiesSchema>;

