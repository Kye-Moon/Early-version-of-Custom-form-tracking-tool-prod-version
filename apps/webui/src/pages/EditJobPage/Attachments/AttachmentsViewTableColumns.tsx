import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, EyeIcon, TrashIcon} from "lucide-react";
import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import moment from "moment";
import {useNavigate} from "@tanstack/react-router";
import Badge from "@/Primitives/Badge/Badge";
import {
	enumToSentenceCase,
	getJobRecordFlagBadgeVariant,
	getJobRecordStatusBadgeVariant,
	getJobRecordTypeBadgeVariant
} from "@/Lib/utils";

export interface JobAttachmentTableColumns {
	id: string;
	name: string
	url: string
	type: string
}

export const jobAttachmentColumns: ColumnDef<JobAttachmentTableColumns>[] = [
	{
		accessorKey: "name",
		header: "File Name",
	},
	{
		accessorKey: "type",
		header: "File Type",
	},
	{
		accessorKey: "url",
		header: "Actions",
		cell: ({row}) => {
			const actions: Action[] = [
				{
					label: "View",
					icon: <EyeIcon/>,
					onClick: () => {
						window.open(row.original.url, "_blank")
					}
				},
				{
					label: "Delete",
					icon: <TrashIcon color={'red'}/>,
					onClick: () => {
						console.log("delete")
					}
				}
			]
			return (
				<ActionsDropMenu actions={actions}/>
			)
		}
	},
];

