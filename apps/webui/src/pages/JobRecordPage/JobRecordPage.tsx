import PageHeadingWithMetaAndActions
	from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import React, {Suspense} from "react";
import JobRecordCell from "@/Pages/JobRecordPage/JobRecordCell";
import {useParams} from "@tanstack/react-router";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {getJobPageBreadCrumb} from "@/Constants/breadcrumbs";
import JobRecordLoadingSkeleton from "@/Components/Loading/JobRecordLoading";

export default function JobRecordPage() {
	const params = useParams({from: "/layout/job-records/$jobRecordId/edit"});
	return (
		<>
			<PageHeadingWithMetaAndActions pageHeading={"Job Record"}/>
			<BreadCrumb pages={getJobPageBreadCrumb({
				jobRecordId: params.jobRecordId
			})}/>
			<PageContentSection>
				<Suspense fallback={<JobRecordLoadingSkeleton/>}>
					<JobRecordCell jobRecordId={params.jobRecordId}/>
				</Suspense>
			</PageContentSection>

		</>
	)
}
