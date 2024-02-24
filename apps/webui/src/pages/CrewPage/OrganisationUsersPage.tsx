import PageHeadingWithMetaAndActions, {
	PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import React, {Suspense} from "react";
import NewOrgMemberDialog from "@/Components/NewOrgMemberDialog/NewOrgMemberDialog";
import CrewTableSection from "@/Pages/CrewPage/CrewTableSection";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";

const crewPageActions: PageHeadingActionButtonProps[] = [
	{
		dialog: <NewOrgMemberDialog  triggerText={"New Member"} dialogTitle={"Add a new member"}/>,
	},
];
export default function OrganisationUsersPage() {
	return (
		<>
			<PageHeadingWithMetaAndActions actions={crewPageActions} pageHeading={"Organisation Users"} />
			<PageContentSection>
				<Suspense fallback={<TableWithHeaderLoadingSkeleton gridCols={'grid-cols-3'} numberRows={9} />}>
					<CrewTableSection
						showInvited={true}
						showSelect={false}
						tableCaption={'Admins / Supervisors / Crew'}
					/>
				</Suspense>
			</PageContentSection>
		</>
	)
}
