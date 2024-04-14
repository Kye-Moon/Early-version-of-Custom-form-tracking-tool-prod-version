import DataTable from "@/Components/DataTable/DataTable";
import {
	JobRecordTableColumn,
	jobRecordTableColumns
} from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordTableColumns";
import {useSuspenseQuery} from "@apollo/client";
import {jobRecordsTableQuery} from "@/Services/variationService";
import React, {useMemo} from "react";
import TableEmptyState from "@/Components/TableEmptyState";
import {JobRecordQuery, JobRecordQueryVariables, JobRecordSearchInput} from "gql-types";
import {useJobRecordSearch} from "@/Context/JobRecordSearchContext";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";

interface VariationTableProps {
	filterType?: 'ACTION' | 'CONFIRMED' | 'ARCHIVED';
	jobId?: string;
	search?: JobRecordSearchInput
}

export default function JobRecordTable() {
	const {
		data,
		loading
	} = useJobRecordSearch();

	const variationRows: JobRecordTableColumn[] = useMemo(() => {
		return data?.searchJobRecords?.map((record) => {
			return {
				id: record.id,
				jobName: record.job.title,
				formName: record.jobForm?.formTemplate.name ?? 'N/A',
				title: record.title,
				type: record.type,
				submittedBy: record.submittedBy.name,
				createdAt: record.createdAt,
			}
		}) || []
	}, [data?.searchJobRecords])

	if (loading) {
		return <TableWithHeaderLoadingSkeleton gridCols={'grid-cols-7'} numberRows={14}/>
	}

	//Empty state
	if (variationRows?.length === 0) {
		return (<TableEmptyState mainText={"No Job Records Found"}
								 subText={"Job records will appear here when submitted by a crew member or supervisor"}/>)
	}
	return (
		<div>
			<DataTable
				columns={jobRecordTableColumns}
				data={variationRows}
			/>
		</div>
	);
}
