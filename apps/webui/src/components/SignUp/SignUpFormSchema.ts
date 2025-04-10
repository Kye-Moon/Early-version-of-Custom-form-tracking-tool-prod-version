import * as z from "zod";
import { InferType } from "prop-types";

export const signUpFormSchema = z.object({
	firstName: z.string().min(1, {message: "First name is required"}).max(50),
	lastName: z.string().min(1, {message: "Last name is required"}).max(50),
	email: z.string().email({message: "Please enter a valid email address"}),
	password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),
	organization: z.string().min(1, {message: "Organization name is required"}).max(50),
});

export const loginFormSchema = z.object({
	email: z.string().email({message: "Please enter a valid email address"}),
	password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),
});

export const acceptInviteFormSchema = z.object({
	firstName: z.string().min(1, {message: "First name is required"}).max(50),
	lastName: z.string().min(1, {message: "Last name is required"}).max(50),
	email: z.string().email({message: "Please enter a valid email address"}),
	password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"}),
});


export type SignUpFormType = InferType<typeof signUpFormSchema>;
export type LoginFormType = InferType<typeof loginFormSchema>;
export type AcceptInviteFormType = InferType<typeof acceptInviteFormSchema>;
