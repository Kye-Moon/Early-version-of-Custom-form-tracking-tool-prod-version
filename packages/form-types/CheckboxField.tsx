import {z} from "zod";
import {ElementsType, FormElementInstance} from "form-types";


export const checkBoxExtraAttributes = {
    label: "Checkbox field",
    helperText: "Helper text",
    required: false,
};

export const checkBoxPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
});

export type CheckBoxCustomInstance = FormElementInstance & {
    extraAttributes: typeof checkBoxExtraAttributes;
};

export type checkBoxPropertiesFormSchemaType = z.infer<typeof checkBoxPropertiesSchema>;