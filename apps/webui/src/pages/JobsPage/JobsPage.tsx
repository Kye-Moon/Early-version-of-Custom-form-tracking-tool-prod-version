import React, {Suspense} from "react";
import PageHeadingWithMetaAndActions, {
	PageHeadingActionButtonProps,
} from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import JobsTable from "@/Components/Jobs/JobsTable/JobsTable";
import TableWithHeaderLoadingSkeleton
	from "@/Components/Loading/Skeletons/TableWithHeaderLoadingSkeleton";
import NewItemFormDialog from "@/Components/NewItemFormDialog";
import NewJobForm from "@/Components/Jobs/NewJobForm/NewJobForm";
import JobSearchProvider, {JobSearchContext} from "@/Context/JobSearchContext";
import JobRecordSearch from "@/Components/JobRecordSearch";
import JobSearch from "@/Components/Jobs/JobsSearch";

const jobsPageActions: PageHeadingActionButtonProps[] = [
	{
		dialog: <NewItemFormDialog form={<NewJobForm/>}
								   label={"New Job"}
								   triggerLabel={"New Job"}
								   dialogContentWidth={"lg"}
		/>
	},
];

export default function JobsPage() {
	return (
		<>
			<PageHeadingWithMetaAndActions
				actions={jobsPageActions}
				pageHeading={"Jobs"}
				subHeading={"Jobs are the portions of work that need to be completed. They can be assigned to crew members and have records created for them."}
			/>
			<PageContentSection>
				<JobSearchProvider>
					<JobSearch/>
					<JobsTable/>
				</JobSearchProvider>
			</PageContentSection>
		</>
	);
}
