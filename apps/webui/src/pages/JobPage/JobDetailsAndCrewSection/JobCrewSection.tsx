import OrganisationMemberTable, {
	OrgMemberTableRowsProps
} from "@/Components/OrganisationMemberTable/OrganisationMemberTable";
import React from "react";
import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";

export const jobCrewQuery = graphql(`
	query JobCrew($jobId: String!) {
		jobCrew(jobId: $jobId) {
			id
			name
			phone
			role
		},
	}
`);

interface  JobCrewSectionProps {
	jobId: string;
}

export default function JobCrewSection({jobId}: JobCrewSectionProps) {
	const {data} = useSuspenseQuery(jobCrewQuery, {variables: {jobId: jobId}})
	const jobCrew: OrgMemberTableRowsProps[] = data?.jobCrew.map((jobCrew) => ({
		name: jobCrew.name,
		id: jobCrew.id,
		phone: jobCrew.phone,
		role: jobCrew.role
	})) ?? []
	return (
		<OrganisationMemberTable members={jobCrew} showSelect={false}
								 tableCaption={"Current Job Crew"}/>
	)
}
