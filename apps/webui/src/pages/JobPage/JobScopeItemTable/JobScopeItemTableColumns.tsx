import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";

export interface JobScopeItemTableColumns {
	id: string;
	reference?: string | null;
	title?: string | null;
}

export const jobScopeItemColumns: ColumnDef<JobScopeItemTableColumns>[] = [
	{
		accessorKey: "reference",
		header: ({column}) => {
			return (
				<button
					className={"flex items-center"}
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Reference
					<ArrowUpDown className="ml-2 h-4 w-4"/>
				</button>
			);
		},
	},
	{
		accessorKey: "title",
		header: ({column}) => {
			return (
				<button
					className={"flex items-center"}
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4"/>
				</button>
			);
		}
	},
];

