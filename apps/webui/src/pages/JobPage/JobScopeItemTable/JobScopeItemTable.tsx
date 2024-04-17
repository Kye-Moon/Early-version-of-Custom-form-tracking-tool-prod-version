import {graphql} from "gql-types";
import DataTable from "@/Components/DataTable/DataTable";
import React from "react";
import {
	jobScopeItemColumns,
	JobScopeItemTableColumns
} from "@/Pages/JobPage/JobScopeItemTable/JobScopeItemTableColumns";
import {useSuspenseQuery} from "@apollo/client";

interface JobScopeItemsProps {
	jobId: string;
}

const query = graphql(`
	query JobScopeItems($input: String!) {
		jobScopeItems(jobId: $input) {
			id
			reference
			title
		}
	}
`)

export default function JobScopeItemTable({jobId}: JobScopeItemsProps) {
	const {data} = useSuspenseQuery(query, {variables: {input: jobId}})

	const rows: JobScopeItemTableColumns[] = data.jobScopeItems?.map((scopeItem) => ({
		id: scopeItem.id,
		reference: scopeItem.reference,
		title: scopeItem.title,
	})).filter((scopeItem) => scopeItem.reference || scopeItem.title) || []

	return (
		<DataTable
			searchColumn={"reference"}
			searchPlaceholder={"Search by reference"}
			columns={jobScopeItemColumns}
			data={rows}
		/>
	)
}
