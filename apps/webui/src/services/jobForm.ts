import {graphql} from "gql-types";
export const createJobFormMutation = graphql(`
	mutation CreateJobForm($input: CreateJobFormInput!) {
		createJobForm(createJobFormInput: $input) {
			id
		}
	}
`)

