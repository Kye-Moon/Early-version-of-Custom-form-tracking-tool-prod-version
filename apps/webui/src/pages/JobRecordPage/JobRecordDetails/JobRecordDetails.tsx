import {ViewDetails} from "@/Pages/JobRecordPage/ViewDetails";
import React from "react";
import {JobRecordQuery} from "gql-types";
import {processFormResponse} from "@/Services/formResponse";
import FormResponseRender from "@/Components/FormResponseRenderer/FormResponseRender";
import {Separator} from "@/Primitives/Seperator";

interface JobRecordDetailsProps {
	jobRecord: JobRecordQuery['jobRecord']
}

export interface OnSaveDetails {
	title: string;
	customer: string;
	description: string;
	type: string;
	status: string;
	flag: string;
}

export default function JobRecordDetails({jobRecord}: JobRecordDetailsProps) {

	const processedDetails = processFormResponse({
		jobForm: jobRecord.jobForm,
		formResponse: jobRecord.formResponse
	})

	return (
		<div className={' pb-4'}>
			<div className={'flex justify-between align-middle mr-4'}>
				<h3 className={'text-xl font-semibold'}>Details</h3>
			</div>
			<ViewDetails variation={jobRecord}/>

			<div className={'my-12 py-4  rounded-xl  pr-6'}>
				<div className={'pb-4'}>
					<h1 className={'text-xl'}>Form: {jobRecord.jobForm?.formTemplate.name}</h1>
					<h1 className={'text-sm text-black/50'} >Description: {jobRecord.jobForm?.formTemplate.description}</h1>
					<Separator/>
				</div>
				<FormResponseRender formFields={processedDetails}/>
			</div>
		</div>
	)
}
