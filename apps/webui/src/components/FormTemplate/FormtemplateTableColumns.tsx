import {ColumnDef} from "@tanstack/react-table";
import Badge from "@/Primitives/Badge/Badge";
import {enumToSentenceCase} from "@/Lib/utils";
import FormTemplatesTableActionCell from "@/Components/FormTemplate/RecordTemplatesTableActionCell";
import {getBadgeVariant} from "@/Lib/badgeUtils";

export interface FormTemplateTableColumn {
	id: string;
	name: string;
	description?: string | null;
	status?: string | null;
	autoAssign?: boolean;
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
					variant={getBadgeVariant(row.getValue("status"))}
					text={row.getValue("status") ? enumToSentenceCase(row.getValue("status")) : '-'}
				/>
			);
		},
	},
	{
		accessorKey: "autoAssign",
		header: "Auto-assign",
		cell: ({row}) => {
			return (
				<div className={"flex items-center"}>
					{row.getValue("autoAssign") ? 'Yes' : 'No'}
				</div>
			);
		},
	}
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
