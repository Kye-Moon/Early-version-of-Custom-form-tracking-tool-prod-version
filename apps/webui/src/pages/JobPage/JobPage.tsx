import {useNavigate, useParams, useRouter} from "@tanstack/react-router";
import {graphql} from "gql-types";
import {useMutation, useQuery} from "@apollo/client";
import PageHeadingWithMetaAndActions, {
	PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import {dashboardSearchJobs, jobPageQuery, jobTableSearchJobs} from "@/Services/jobService";
import JobDetails from "@/Pages/JobPage/JobDetailsAndCrewSection/JobDetails";
import JobRecords from "@/Pages/JobPage/JobRecords";
import React, {JSX, Suspense} from "react";
import {Button} from "@/Primitives/Button/Button";
import {EditIcon} from "lucide-react";
import DeleteItemDialog from "@/Components/DeleteItemDialog/DeleteItemDialog";
import toast from "react-hot-toast";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {getJobPageBreadCrumbWithJobName} from "@/Constants/breadcrumbs";
import JobScopeItemTable from "@/Pages/JobPage/JobScopeItemTable/JobScopeItemTable";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";
import JobCrewSection from "@/Pages/JobPage/JobDetailsAndCrewSection/JobCrewSection";
import AttachmentsView from "@/Pages/EditJobPage/Attachments/AttachmentsView";
import FormTemplateTable from "@/Components/RecordTemplate/FormTemplateTable";
import JobFormsCell from "@/Components/JobForms/JobFormsCell";

const deleteJobMutation = graphql(`
	mutation DeleteJob($input: String!) {
		deleteJob(id: $input)
	}
`);

export default function JobPage(): JSX.Element {
	const params = useParams({from: "/layout/jobs/$jobId"});
	const router = useRouter();
	const {data} = useQuery(jobPageQuery, {variables: {jobId: params.jobId}});


	const [deleteJob, {loading}] = useMutation(deleteJobMutation, {
		variables: {input: params.jobId},
		onCompleted: async () => {
			toast.success("Job deleted successfully");
			await router.navigate({to: '/jobs'})
		},
		onError: () => {
			toast.error("Error deleting job");
		},
		refetchQueries: [
			{query: jobTableSearchJobs, variables: {input: {}}},
			{query: dashboardSearchJobs, variables: {input: {}}}],
		awaitRefetchQueries: true,
	});

	const jobPageActions: PageHeadingActionButtonProps[] = [
		{
			dialog: <JobPageActions/>,
		},
		{
			dialog: <DeleteItemDialog triggerText={"Delete"} onConfirm={deleteJob}
									  loadingStatus={loading}/>,
		}
	];


	return (
		<div className={'overflow-auto'}>
			<PageHeadingWithMetaAndActions actions={jobPageActions}
										   pageHeading={data?.job.title ?? ""}/>
			<BreadCrumb pages={getJobPageBreadCrumbWithJobName()}/>
			<PageContentSection>
				<div className={'grid grid-cols-1 xl:grid-cols-2'}>
					<div className={'col-span-1 space-y-4 '}>
						<h1 className={'text-xl font-semibold'}>Details</h1>
						<Suspense fallback={<div className={'mr-12'}><TableWithHeaderLoadingSkeleton
							showHeader={false}
							gridCols={'grid-cols-2'} numberRows={5}/>
						</div>}>
							<JobDetails jobId={params.jobId}/>
						</Suspense>
					</div>
					<div className={'col-span-1 space-y-4 '}>
						<h1 className={'text-xl font-semibold'}>Crew</h1>
						<Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
							<JobCrewSection jobId={params.jobId}/>
						</Suspense>
					</div>
				</div>
			</PageContentSection>
			<PageContentSection>
				<div className={'grid grid-cols-1 xl:grid-cols-2'}>
					<div className={'col-span-2 '}>
						<h1 className={'text-xl font-semibold'}>Records</h1>
						<JobRecords jobId={data?.job.id}/>
					</div>
				</div>
			</PageContentSection>
			<PageContentSection>
				<div className={'grid grid-cols-2 xl:grid-cols-2'}>
					<div className={'col-span-2 '}>
						<h1 className={'text-xl font-semibold'}>Scope Items</h1>
						<Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
							<JobScopeItemTable jobId={params.jobId}/>
						</Suspense>
					</div>
				</div>
			</PageContentSection>
			<PageContentSection>
				<div className={'grid grid-cols-2 xl:grid-cols-2'}>
					<div className={'col-span-2 '}>
						<h1 className={'text-xl font-semibold'}>Assigned Forms</h1>
						<Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
							<JobFormsCell jobId={params.jobId}/>
						</Suspense>
					</div>
				</div>
			</PageContentSection>
			<PageContentSection>
				<div className={'grid grid-cols-1 xl:grid-cols-2'}>
					<div className={'col-span-2 '}>
						<h1 className={'text-xl font-semibold'}>Attachments</h1>
						<Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
							<AttachmentsView referenceId={params.jobId}/>
						</Suspense>
					</div>
				</div>
			</PageContentSection>
		</div>
	);
}

/**
 * This is a component that is used in the PageHeadingWithMetaAndActions component
 * It is a button that navigates to the edit job page
 * TODO: Should be able to navigate via a function surely? this should not be needed
 * @constructor
 */
export function JobPageActions() {
	const navigate = useNavigate();
	const params = useParams({from: "/layout/jobs/$jobId"});

	return (
		<Button onClick={() => navigate({to: '/jobs/$jobId/edit', params: {jobId: params.jobId}})}
				variant={'default'}
				size={'sm'}>
			<EditIcon className={'w-4 mr-2'}/>
			<span>Edit Job</span>
		</Button>
	)
}
