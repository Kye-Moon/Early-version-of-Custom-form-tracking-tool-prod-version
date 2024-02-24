import OrganisationMemberTable, {
	OrgMemberTableRowsProps
} from "@/Components/OrganisationMemberTable/OrganisationMemberTable";
import TableEmptyState from "@/Components/TableEmptyState";
import React from "react";
import {useOrganization} from "@clerk/clerk-react";
import {useSuspenseQuery} from "@apollo/client";
import {graphql} from "gql-types";

interface CrewTableSectionProps {
	showSelect?: boolean;
	showInvited?: boolean;
	tableCaption?: string;
	initialSelected?: string[];
}

const query = graphql(`
	query CrewPageTableSection($input: SearchUserInput!) {
		searchUsers(userSearchInput: $input) {
			id
			name
			userOrganisation {
				role
			}
		}
	}
`)

export default function CrewTableSection({
											 showSelect,
											 showInvited,
											 tableCaption,
											 initialSelected = []
										 }: CrewTableSectionProps) {

	const {data} = useSuspenseQuery(query, {variables: {input: {}}});
	const members: OrgMemberTableRowsProps[] = []
	const {invitations} = useOrganization({
		invitations: {
			keepPreviousData: true,
		}
	});

	data?.searchUsers?.forEach((user) => {
		members.push({
			id: user.id,
			name: user.name,
			role: user.userOrganisation?.role,
			status: "active"
		})
	})

	if (showInvited) {
		invitations?.data?.forEach((invite) => {
			members.push({
				id: invite?.id,
				name: invite.emailAddress,
				role: invite.role,
				status: "invited"
			})
		})
	}

	// Empty state
	if (members?.length === 0) {
		return (<TableEmptyState mainText={"No crew members found"}
								 subText={"Invite crew members to add them to jobs"}/>)
	}
	return (
		<OrganisationMemberTable
			members={members}
			showSelect={showSelect}
			tableCaption={tableCaption}
			initialSelected={initialSelected}
		/>
	)
}
