import {useParams, useRouter} from "@tanstack/react-router";
import {useMutation, useQuery} from "@apollo/client";
import toast from "react-hot-toast";
import PageHeadingWithMetaAndActions, {
	PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import DeleteItemDialog from "@/Components/DeleteItemDialog/DeleteItemDialog";
import React, {Suspense} from "react";
import {deleteProject, finaAllProjects, findProject} from "@/Services/projectService";
import {ProjectPageActions} from "@/Pages/ProjectPage/ProjectPageActions";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {getViewProjectPageBreadCrumb} from "@/Constants/breadcrumbs";
import PageContentSection from "@/Components/PageContentSection";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";
import AttachmentsView from "@/Pages/EditJobPage/Attachments/AttachmentsView";
import StackedLabelAndValue from "@/Components/StackedLabelAndValue";
import Badge from "@/Primitives/Badge/Badge";
import {enumToSentenceCase} from "@/Lib/utils";
import JobsTable from "@/Components/Jobs/JobsTable/JobsTable";
import {getBadgeVariant} from "@/Lib/badgeUtils";

export default function ViewProject() {
    const params = useParams({from: "/layout/projects/$projectId"});
    const router = useRouter();
    const {data} = useQuery(findProject, {variables: {id: params.projectId}});

    const [deleteProjectMutation, {loading}] = useMutation(deleteProject, {
        variables: {id: params.projectId},
        onCompleted: async () => {
            toast.success("project deleted");
            await router.navigate({to: '/projects'})
        },
        onError: () => {
            toast.error("Error deleting project");
        },
        refetchQueries: [{query: finaAllProjects}],
        awaitRefetchQueries: true,
    });

    const projectPageActions: PageHeadingActionButtonProps[] = [
        {
            dialog: <ProjectPageActions/>,
        },
        {
            dialog: <DeleteItemDialog triggerText={"Delete"} onConfirm={deleteProjectMutation}
                                      loadingStatus={loading}/>,
        }
    ];

    return (
        <div className={'overflow-auto'}>
            <PageHeadingWithMetaAndActions actions={projectPageActions}
                                           pageHeading={data?.project.title ?? "-"}/>
            <BreadCrumb pages={getViewProjectPageBreadCrumb({projectId: data?.project.id})}/>
            <PageContentSection>
                <h1 className={'text-xl font-semibold'}>Details</h1>
                <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <StackedLabelAndValue label={'Title'} value={data?.project.title}/>
                    </div>
                    <div className="sm:col-span-2">
                        <StackedLabelAndValue label={'Customer Name'} value={data?.project.customer}/>
                    </div>
                    <div className="sm:col-span-2 ">
                        <StackedLabelAndValue label={'Status'}
                                              value={
                                                  <Badge
                                                      text={data?.project.status ? enumToSentenceCase(data.project.status) : '-'}
                                                      size={"sm"}
                                                      variant={data?.project.status ? getBadgeVariant(data.project.status) : 'default'}/>
                                              }/>
                    </div>
                    <div className="sm:col-span-6 mb-6">
                        <StackedLabelAndValue label={'Description'}
                                              value={data?.project.description ? data.project.description : '-'}/>
                    </div>
                </div>
            </PageContentSection>
            <PageContentSection>
                <div className={'grid grid-cols-1 xl:grid-cols-2'}>
                    <div className={'col-span-2 '}>
                        <h1 className={'text-xl font-semibold'}>Jobs</h1>
                        <Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
                            <JobsTable projectId={params.projectId}/>
                        </Suspense>
                    </div>
                </div>
            </PageContentSection>
            <PageContentSection>
                <div className={'grid grid-cols-1 xl:grid-cols-2'}>
                    <div className={'col-span-2 '}>
                        <h1 className={'text-xl font-semibold'}>Attachments</h1>
                        <Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
                            <AttachmentsView referenceId={params.projectId}/>
                        </Suspense>
                    </div>
                </div>
            </PageContentSection>
        </div>
    );
}
