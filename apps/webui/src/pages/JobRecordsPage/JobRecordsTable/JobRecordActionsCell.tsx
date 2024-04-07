import {useNavigate} from "@tanstack/react-router";
import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import {ArchiveIcon, EyeIcon} from "lucide-react";
import {Row} from "@tanstack/react-table";
import {JobRecordTableColumn} from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordTableColumns";
import {useMutation} from "@apollo/client";
import {updateMutation} from "@/Services/jobRecordService";
import toast from "react-hot-toast";
import {Spinner} from "@/Components/Loading/Spinner";

interface JobRecordActionsCellProps {
	row: Row<JobRecordTableColumn>
}


export default function JobRecordActionsCell({row}: JobRecordActionsCellProps) {
	const navigate = useNavigate();
	const [archiveJobRecord,{loading}] = useMutation(updateMutation, {
		onError: (error) => {
			toast.error(error.message)
		},
		onCompleted: () => {
			toast.success("Job Record Archived")
		},
		awaitRefetchQueries: true,
		refetchQueries: ['JobRecordTableSearch']
	})


	const JobsTableColumnActions: Action[] = [
		{
			label: "View",
			icon: <EyeIcon className={"h-4 text-primary/50"}/>,
			onClick: async () => {
				await navigate({
					to: '/job-records/$jobRecordId/edit',
					params: {jobRecordId: row.original.id}
				})
			},
		},
		{
			label: "Archive",
			icon: !loading ? <ArchiveIcon className={"h-4 text-destructive/50"}/> : <Spinner/>,
			onClick: async () => {
				await archiveJobRecord({
					variables: {input: {id: row.original.id, archived: true}}
				})
			},
		},
	];

	return <ActionsDropMenu actions={JobsTableColumnActions}/>;

}
