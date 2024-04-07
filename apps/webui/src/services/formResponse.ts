import {JobRecordQuery} from "gql-types";


interface ProcessFormResponse {
	jobForm: JobRecordQuery["jobRecord"]['jobForm']
	formResponse: JobRecordQuery["jobRecord"]['formResponse']
}

interface OutputElement {
	id?: string | number
	title: string
	value: string
	type: string
}

export function processFormResponse({jobForm, formResponse}: ProcessFormResponse) {
	if (!jobForm || !formResponse) {
		return [];
	}
	return jobForm.formTemplate.structure.elements.map((element: {
		extraAttributes: { label: any; title: any; };
		id: string | number;
		type: string;
	}) => {
		// Initialize a basic structure for the output
		let outputElement: OutputElement = {
			id: element.id,
			title: element.extraAttributes?.label || element.extraAttributes?.title || '',
			value: formResponse.response[element.id],
			type: element.type
		};

		return outputElement;
	});
}
