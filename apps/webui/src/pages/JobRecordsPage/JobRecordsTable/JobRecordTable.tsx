import DataTable from "@/Components/DataTable/DataTable";
import {
	JobRecordTableColumn,
	jobRecordTableColumns
} from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordTableColumns";
import {useSuspenseQuery} from "@apollo/client";
import {jobRecordsTableQuery} from "@/Services/variationService";
import React, {useMemo} from "react";
import TableEmptyState from "@/Components/TableEmptyState";

interface VariationTableProps {
	filterType?: 'ACTION' | 'CONFIRMED' | 'ARCHIVED';
	jobId?: string;
}

export default function JobRecordTable({jobId}: VariationTableProps) {
	const {data} = useSuspenseQuery(jobRecordsTableQuery, {variables: {input: {...(jobId && {jobId: jobId})}}})
	const variationRows: JobRecordTableColumn[] = useMemo(() => {
		return data.searchJobRecords.map((record) => {
			return {
				id: record.id,
				jobName: record.job.title,
				formName: record.jobForm?.formTemplate.name ?? 'N/A',
				title: record.title,
				type: record.type,
				submittedBy: record.submittedBy.name,
				createdAt: record.createdAt,
			}
		})
	}, [data?.searchJobRecords])


	//Empty state
	if (variationRows.length === 0) {
		return (<TableEmptyState mainText={"No Job Records Found"}
								 subText={"Job records will appear here when submitted by a crew member or supervisor"}/>)
	}
	return (
		<div>
			<DataTable
				searchColumn={"title"}
				searchPlaceholder={"Search by name"}
				secondarySearchColumn={'jobName'}
				secondarySearchPlaceholder={'Search by job'}
				columns={jobRecordTableColumns}
				data={variationRows}
			/>
		</div>
	);
}
