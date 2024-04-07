import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import moment from "moment";
import Badge from "@/Primitives/Badge/Badge";
import JobRecordActionsCell from "@/Pages/JobRecordsPage/JobRecordsTable/JobRecordActionsCell";
import {getBadgeVariant} from "@/Lib/badgeUtils";

export interface JobRecordTableColumn {
	id: string;
	jobName?: string | null;
	formName?: string | null;
	title: string;
	type?: string | null;
	submittedBy: string;
	createdAt: string;
}

export const jobRecordTableColumns: ColumnDef<JobRecordTableColumn>[] = [
	{
		accessorKey: "title",
		header: "Name",
	},
	{
		accessorKey: "jobName",
		header: "Job",
	},
	{
		accessorKey: "formName",
		header: "Form",
	},
	{
		accessorKey: "type",
		header: ({column}) => {
			return (
				<button
					className={"flex items-center"}
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4"/>
				</button>
			);
		},
		cell: ({row}) => {
			return <Badge text={row.getValue("type") ? row.getValue("type") : "-"} size={'sm'}
						  variant={getBadgeVariant(row.getValue("type"))}/>

		}
	},
	{
		accessorKey: "submittedBy",
		header: "Submitted by",
	},
	{
		accessorKey: "createdAt",
		header: ({column}) => {
			return (
				<button
					className={"flex items-center"}
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4"/>
				</button>
			);
		},
		cell: ({row}) => {
			return moment(row.getValue("createdAt")).isValid()
				? moment(row.getValue("createdAt")).toDate().toDateString()
				: "-";
		},
	},
	{
		id: "actions",
		cell: ({row}) => {
			return <JobRecordActionsCell row={row}/>;
		},
	},
];

