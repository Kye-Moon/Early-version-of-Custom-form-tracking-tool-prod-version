import PageHeadingWithMetaAndActions, {
	PageHeadingActionButtonProps
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import JobRecordTable from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordTable";
import React from "react";
import NewJobRecordDialog from "@/Components/JobRecords/NewJobRecordDialog/NewJobRecordDialog";
import JobRecordSearch from "@/Components/JobRecordSearch";
import JobRecordSearchProvider from "@/Context/JobRecordSearchContext";


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
				<div className={'space-y-4'}>
					<JobRecordSearchProvider>
						<JobRecordSearch/>
						<JobRecordTable/>
					</JobRecordSearchProvider>
				</div>
			</PageContentSection>
		</>
	);
}

