import * as z from "zod";
import {InferType} from "prop-types";

export const newOrgMemberFormSchema = z.object({
	email: z.string().email({message: "Please enter a valid email address"}),
	role: z.enum(["org:admin", "org:member"], {
		errorMap: (issue, _ctx) => {
			return {
				message: "Please select a role",
			}
		}
	}),
})

export type NewOrgMemberFormType = InferType<typeof newOrgMemberFormSchema>;
