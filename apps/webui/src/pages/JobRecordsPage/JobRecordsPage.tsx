import PageHeadingWithMetaAndActions, {
	PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import JobRecordTable from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordTable";
import React, {Suspense} from "react";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";
import NewJobRecordDialog from "@/Components/JobRecords/NewJobRecordDialog/NewJobRecordDialog";


const jobRecordsPageActions: PageHeadingActionButtonProps[] = [
	{
		dialog: <NewJobRecordDialog/>,
	},
];

export default function JobRecordsPage() {
	return (
		<>
			<PageHeadingWithMetaAndActions
				actions={jobRecordsPageActions}
				pageHeading={"Job Records"}
			/>
			<PageContentSection>
				<Suspense fallback={<TableWithHeaderLoadingSkeleton gridCols={'grid-cols-7'}
																	numberRows={14}
																	showSearch={true}/>}>
					<JobRecordTable/>
				</Suspense>
			</PageContentSection>
		</>
	);
}

