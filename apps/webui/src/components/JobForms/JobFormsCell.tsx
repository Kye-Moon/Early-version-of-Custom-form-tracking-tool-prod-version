import FormTemplateTable from "@/Components/FormTemplate/FormTemplateTable";
import {useSuspenseQuery} from "@apollo/client";
import {graphql} from "gql-types";
import {useMemo} from "react";


const query = graphql(`
	query JobForms($jobId: String!) {
		job(id: $jobId) {
			jobForms {
				id
				name
				description
				category
				status
			}
		},
	}
`)

interface JobFormsCellProps {
	jobId: string;
}

export default function JobFormsCell({jobId}: JobFormsCellProps) {
	const {data} = useSuspenseQuery(query, {variables: {jobId: jobId}})

	return (
		<FormTemplateTable showActions={false} formTemplates={data?.job.jobForms ?? []}/>
	)
}
