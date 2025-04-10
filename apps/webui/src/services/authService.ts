import {graphql} from "gql-types";

export const signUpMutation = graphql(`
	mutation signUp($input: SignUpInput!) {
		signUp(signUpInput: $input){
			authOrgId
		}
	}
`)
