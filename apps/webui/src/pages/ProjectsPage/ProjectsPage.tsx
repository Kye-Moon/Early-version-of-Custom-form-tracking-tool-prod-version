import PageHeadingWithMetaAndActions, {
    PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import React, {Suspense} from "react";
import TableWithHeaderLoadingSkeleton
    from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";
import NewItemFormDialog from "@/Components/NewItemFormDialog";
import NewProjectForm from "@/Components/Project/NewProjectForm/NewProjectForm";
import ProjectsTable from "@/Pages/ProjectsPage/ProjectsTable";

const projectsPageActions: PageHeadingActionButtonProps[] = [
    {
        dialog: <NewItemFormDialog form={<NewProjectForm/>}
                                   label={"New Project"}
                                   triggerLabel={"New Project"}
                                   description={"Create a new project, you can add jobs, attachments etc to it later."}
        />
    },
];
export default function ProjectsPage() {
    return (
        <>
            <PageHeadingWithMetaAndActions
                actions={projectsPageActions}
                pageHeading={"Projects"}
                subHeading={"Projects are high level groupings of jobs. They can be used to group jobs by customer, location or any other criteria."}
            />
            <PageContentSection>
                <Suspense fallback={<TableWithHeaderLoadingSkeleton gridCols={'grid-cols-7'}
                                                                    numberRows={14}
                                                                    showSearch={true}/>
                }>
                    <ProjectsTable/>
                </Suspense>
            </PageContentSection>
        </>
    );
}
