import PageHeadingWithMetaAndActions, {
    PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import React, {Suspense} from "react";
import NewOrgMemberDialog from "@/Components/NewOrgMemberDialog/NewOrgMemberDialog";
import CrewTableSection from "@/Pages/CrewPage/CrewTableSection";
import TableWithHeaderLoadingSkeleton from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";
import {useAuth} from "@clerk/clerk-react";
import {hasOrgRole} from "@/Lib/utils";

const crewPageActions: PageHeadingActionButtonProps[] = [
    {
        dialog: <NewOrgMemberDialog triggerText={"New Member"} dialogTitle={"Add a new member"}/>,
    },
];
export default function OrganisationUsersPage() {
    const {orgRole} = useAuth();
    return (
        <>
            <PageHeadingWithMetaAndActions
                actions={hasOrgRole(orgRole, 'org:admin') ? crewPageActions : []}
                pageHeading={"Organisation Users"}
                subHeading={!hasOrgRole(orgRole, 'org:admin') ? "Organisation admin privileges are required to add or remove users." : ''}
            />
            <PageContentSection>
                <Suspense fallback={<TableWithHeaderLoadingSkeleton gridCols={'grid-cols-3'} numberRows={9}/>}>
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
