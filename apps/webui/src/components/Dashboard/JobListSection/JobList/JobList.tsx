import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/Primitives/Table";

import JobDetailsCell from "@/Components/Dashboard/JobListSection/JobList/JobDetailsCell";
import JobActionsCell from "@/Components/Dashboard/JobListSection/JobList/JobActionsCell";
import {useSuspenseQuery} from "@apollo/client";
import {dashboardSearchJobs} from "@/Services/jobService";
import {Job} from "gql-types/gql/graphql";
import TableEmptyState from "@/Components/TableEmptyState";

export default function JobList() {
	const {data} = useSuspenseQuery(dashboardSearchJobs, {variables: {input: {limit: 15}}});

	//Empty state
	if (data.searchJobs.length === 0) return (<TableEmptyState mainText={"No jobs found"}/>)

	return (
		<Table>
			<TableCaption>Recent Jobs</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Details</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.searchJobs.map((job: Omit<Job, 'ownerId' | "attachments">) => (
					<TableRow key={job.id}>
						<TableCell className="font-medium">
							<JobDetailsCell job={job}/>
						</TableCell>
						<TableCell className="text-right">
							<JobActionsCell jobID={job.id}/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

