import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";
import OrganisationMemberTable from "@/Components/OrganisationMemberTable/OrganisationMemberTable";

const query = graphql(`
	query AdminPageTableSection($input: SearchUserInput!) {
		searchUsers(userSearchInput: $input) {
			id
			name
			phone
		}
	}
`)

export default function AdminPageTableSection() {
	const {data} = useSuspenseQuery(query, {variables: {input: {role:["ADMIN","OWNER"]}}})

	return (
		<OrganisationMemberTable showSelect={false} members={data.searchUsers}
								 tableCaption={"Supervisors"}/>
	)
}
