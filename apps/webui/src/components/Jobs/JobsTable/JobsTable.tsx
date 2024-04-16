import DataTable from "@/Components/DataTable/DataTable";
import {jobsTableColumns} from "@/Components/Jobs/JobsTable/JobsTableColumns";
import {useSuspenseQuery} from "@apollo/client";
import {convertJobsToJobsTableColumns, jobTableSearchJobs} from "@/Services/jobService";
import React, {useMemo} from "react";
import TableEmptyState from "@/Components/TableEmptyState";
import {useJobSearch} from "@/Context/JobSearchContext";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";


interface JobsTableProps {
	projectId?: string;
}

export default function JobsTable({projectId}: JobsTableProps) {
	const {data, loading} = useJobSearch()

	const jobs = useMemo(() => convertJobsToJobsTableColumns(data), [data]);

	if (loading) {
		return <TableWithHeaderLoadingSkeleton gridCols={'grid-cols-7'} numberRows={14}/>
	}
	//Empty state
	if (jobs.length === 0) {
		return (<TableEmptyState mainText={"No jobs found"}/>)
	}
	return (
		<div>
			<DataTable
				columns={jobsTableColumns}
				data={jobs}
			/>
		</div>
	);
}
