import StackedLabelAndValue from "@/Components/StackedLabelAndValue";
import {isValid, parseISO} from "date-fns";
import Badge from "@/Primitives/Badge/Badge";
import {enumToSentenceCase} from "@/Lib/utils";
import React from "react";
import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";
import {getBadgeVariant} from "@/Lib/badgeUtils";

interface JobDetailsProps {
	jobId: string;
}


const query = graphql(`
	query JobDetails($jobId: String!) {
		job(id: $jobId) {
			id
			title
			description
			ownerId
			status
			customerName
			createdAt
			dueDate
			project {
				id
				title
			}
		},
	}
`)

export default function JobDetails({jobId}: JobDetailsProps) {
	const {data} = useSuspenseQuery(query, {variables: {jobId: jobId}})
	console.log(data)
	return (
		<div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
			<div className="sm:col-span-6">
				<StackedLabelAndValue label={'Title'} value={data.job.title}/>
			</div>
			<div className="sm:col-span-3">
				<StackedLabelAndValue label={'Customer Name'} value={data.job.customerName}/>
			</div>
			<div className="sm:col-span-3">
				<StackedLabelAndValue label={'Due Date'}
									  value={isValid(data.job.dueDate) ? parseISO(data.job.dueDate).toDateString() : '-'}/>
			</div>
			<div className="sm:col-span-6">
				<StackedLabelAndValue label={'Project'} value={data.job.project?.title ?? "-"}/>
			</div>
			<div className="sm:col-span-3 ">
				<StackedLabelAndValue label={'Status'}
									  value={
										  <Badge
											  text={data.job.status ? enumToSentenceCase(data.job.status) : '-'}
											  size={"sm"}
											  variant={data.job.status ? getBadgeVariant(data.job.status) : 'default'}/>
									  }/>
			</div>
			<div className="sm:col-span-6 mb-6">
				<StackedLabelAndValue label={'Description'}
									  value={data.job.description ? data.job.description : '-'}/>
			</div>
		</div>
	)
}
