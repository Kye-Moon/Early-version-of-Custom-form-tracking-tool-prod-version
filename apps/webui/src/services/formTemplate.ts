import {graphql} from "gql-types";

export const createFormTemplateMutation = graphql(`
	mutation CreateFormTemplate($input: CreateFormTemplateInput!) {
		createFormTemplate(createFormTemplateInput: $input) {
			id
		}
	}
`)

export const updateFormTemplateMutation = graphql(`
	mutation UpdateFormTemplate($input: UpdateFormTemplateInput!) {
		updateFormTemplate(updateFormTemplateInput: $input) {
			id
		}
	}
`)


export const duplicateFormTemplateMutation = graphql(`
	mutation DuplicateFormTemplate($id: String!) {
		duplicateFormTemplate(id: $id) {
			id
		}
	}
`)

export const findFormTemplateQuery = graphql(`
	query FindFormTemplate($id: String!) {
		formTemplate(id: $id) {
			id
			name
			description
			structure
			status
		}
	}
`)

export const findAllFormTemplateQuery = graphql(`
	query FindAllFormTemplate {
		formTemplates {
			id
			name
			description
			category
			status
			autoAssign
		}
	}
`)



