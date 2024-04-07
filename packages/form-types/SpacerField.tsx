import {FormElementInstance} from "form-types";
import {z} from "zod";

export const SpacerExtraAttributes = {
    height: 20, // px
};

export const SpacerPropertiesSchema = z.object({
    height: z.number().min(5).max(200),
});

export type SpacerCustomInstance = FormElementInstance & {
    extraAttributes: typeof SpacerExtraAttributes;
};

export type propertiesFormSchemaType = z.infer<typeof SpacerPropertiesSchema>;

