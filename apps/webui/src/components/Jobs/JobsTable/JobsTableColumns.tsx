import {ColumnDef} from "@tanstack/react-table";
import Badge from "@/Primitives/Badge/Badge";
import {enumToSentenceCase} from "@/Lib/utils";
import {ArrowUpDown} from "lucide-react";
import JobsTableActionCell from "@/Components/Jobs/JobsTable/JobsTableActionCell";
import {getBadgeVariant} from "@/Lib/badgeUtils";

export interface JobsTableColumn {
	id: string;
	title: string;
	status: string;
	customer: string;
	numRecords: number;
}

export const jobsTableColumns: ColumnDef<JobsTableColumn>[] = [
	{
		accessorKey: "title",
		header: "Name",
	},
	{
		accessorKey: "customer",
		header: "Customer",
	},
	{
		accessorKey: "status",
		header: ({column}) => {
			return (
				<button
					className={"flex items-center"}
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Job Status
					<ArrowUpDown className="ml-2 h-4 w-4"/>
				</button>
			);
		},
		cell: ({row}) => {
			return (
				<Badge
					size={"sm"}
					variant={getBadgeVariant(row.getValue("status"))}
					text={row.getValue("status") ? enumToSentenceCase(row.getValue("status")) : '-'}
				/>
			);
		},
	},
	{
		accessorKey: "numRecords",
		header: "# Records",
	},
	{
		id: "actions",
		cell: ({row}) => {
			return <div className={'text-right'}>
				<JobsTableActionCell row={row}/>
			</div>
		},
	},
];
