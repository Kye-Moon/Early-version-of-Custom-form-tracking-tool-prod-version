import {useParams} from "@tanstack/react-router";
import {useQuery} from "@apollo/client";
import {jobWithCrewQuery} from "@/Services/jobService";
import PageHeadingWithMetaAndActions
	from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import EditJobForm from "@/Pages/EditJobPage/EditJobForm";
import React, {Suspense, useRef, useState} from "react";
import EditJobScopeItems from "@/Pages/EditJobPage/EditJobFormComponents/EditJobScopeItems";
import {AttachmentUpload, AttachmentUploadHandles} from "@/Pages/EditJobPage/AttachmentUpload";
import AttachmentsView from "@/Pages/EditJobPage/Attachments/AttachmentsView";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {getEditJobPageBreadCrumb} from "@/Constants/breadcrumbs";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";


export default function EditJobPage() {
	const params = useParams({from: "/layout/jobs/$jobId"});
	const {data, loading} = useQuery(jobWithCrewQuery, {variables: {jobId: params.jobId}});
	const jobCrew = data?.jobCrew.map((jobCrew) => jobCrew.id)
	const attachmentUploadRef = useRef<AttachmentUploadHandles>(null);
	const [uploading, setUploading] = useState(false);

	const triggerUpload = async () => {
		if (attachmentUploadRef.current) {
			setUploading(true);
			await attachmentUploadRef.current.handleUpload();
			setUploading(false);
		}
	};

	return (
		<>
			<PageHeadingWithMetaAndActions pageHeading={'Edit ' + data?.job.title || ""}/>
			<BreadCrumb pages={getEditJobPageBreadCrumb({jobId: params.jobId})}/>
			<PageContentSection>
				{loading ? (<><TableWithHeaderLoadingSkeleton/> </>) : (<EditJobForm jobDetails={data?.job} jobCrew={jobCrew}/>)}
			</PageContentSection>
			<PageContentSection>
				<div className={'col-span-2 '}>
					<Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
						<h1 className={'text-xl font-semibold'}>Scope Items</h1>
						<h3 className={'text-sm pb-4 text-gray-400'}>Add or remove scope items from
							this job</h3>
						<EditJobScopeItems jobId={params.jobId}/>
					</Suspense>
				</div>
			</PageContentSection>
			<PageContentSection>
				<div className={'space-y-12'}>
					<div className={'col-span-2 '}>
						<AttachmentUpload ref={attachmentUploadRef} referenceType={"JOB"}
										  referenceId={params.jobId}/>
						<div className={'flex justify-end pt-6'}>
							<LoadingButton label={"Upload"} loadingStatus={uploading}
										   onClick={triggerUpload}
										   variant={'default'}/>
						</div>
					</div>
					<div>
						<Suspense fallback={<TableWithHeaderLoadingSkeleton/>}>
							<AttachmentsView referenceId={params.jobId}/>
						</Suspense>
					</div>
				</div>
			</PageContentSection>
		</>
	);
}
