"use client";

import {z} from "zod";
import {ElementsType, FormElementInstance} from "form-types";

export const dateExtraAttributes = {
    label: "Date field",
    helperText: "Pick a date",
    required: false,
};

export const datePropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
});


export type DateCustomInstance = FormElementInstance & {
    extraAttributes: typeof dateExtraAttributes;
};


export type datePropertiesFormSchemaType = z.infer<typeof datePropertiesSchema>;