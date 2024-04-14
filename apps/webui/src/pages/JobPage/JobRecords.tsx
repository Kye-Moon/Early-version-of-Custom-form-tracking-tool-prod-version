import JobRecordTable from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordTable";
import React from "react";
import JobRecordSearch from "@/Components/JobRecordSearch";
import JobRecordSearchProvider from "@/Context/JobRecordSearchContext";

interface JobVariationsProps {
	jobId: string | undefined;
}

export default function JobRecords({jobId}: JobVariationsProps) {

	return (
		<div className={'py-4'}>
			<JobRecordSearchProvider defaultJobId={jobId}>
					<JobRecordSearch hideJobSelect={true}/>
					<JobRecordTable/>
			</JobRecordSearchProvider>
		</div>
	)
}
