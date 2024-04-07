import {ColumnDef} from "@tanstack/react-table";
import Badge from "@/Primitives/Badge/Badge";
import {
	enumToSentenceCase,
	getFormTemplateStatusBadgeVariant,
	getJobStatusBadgeVariant
} from "@/Lib/utils";
import {ArrowUpDown} from "lucide-react";
import JobsTableActionCell from "@/Components/Jobs/JobsTable/JobsTableActionCell";
import FormTemplatesTableActionCell
	from "@/Components/RecordTemplate/RecordTemplatesTableActionCell";

export interface FormTemplateTableColumn {
	id: string;
	name: string;
	description?: string | null;
	status?: string | null;
}

export const baseFormTemplateTableColumns: ColumnDef<FormTemplateTableColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({row}) => {
			return row.getValue("description") ? String(row.getValue("description")).slice(0, 100) : '-';
		}
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({row}) => {
			return (
				<Badge
					size={"sm"}
					variant={'default'}
					text={row.getValue("category") ? enumToSentenceCase(row.getValue("category")).toUpperCase() : '-'}
				/>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({column}) => {
			return (
				<button
					className={"flex items-center"}
				>
					Status
				</button>
			);
		},
		cell: ({row}) => {
			return (
				<Badge
					size={"sm"}
					variant={getFormTemplateStatusBadgeVariant(row.getValue("status"))}
					text={row.getValue("status") ? enumToSentenceCase(row.getValue("status")) : '-'}
				/>
			);
		},
	},
];

export const formTemplateTableColumns: ColumnDef<FormTemplateTableColumn>[] = [
	...baseFormTemplateTableColumns,
	{
		id: "actions",
		cell: ({row}) => {
			return <div className={'text-right'}><FormTemplatesTableActionCell row={row}/></div>
		},
	},
];
