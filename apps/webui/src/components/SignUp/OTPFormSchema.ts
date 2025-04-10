import * as z from "zod";
import { InferType } from "prop-types";

export const otpFormSchema = z.object({
	code: z.string().min(1, {message: "Code is required"}).max(6),
});

export type OTPFormType = InferType<typeof otpFormSchema>;
