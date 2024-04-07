import {ColumnDef} from "@tanstack/react-table";

export interface JobScopeItemTableColumns {
	id: string;
	reference?: string | null;
	title?: string | null;
}

export const jobScopeItemColumns: ColumnDef<JobScopeItemTableColumns>[] = [
	{
		accessorKey: "reference",
		header: "Reference",
	},
	{
		accessorKey: "title",
		header: "Title",
	},
];

