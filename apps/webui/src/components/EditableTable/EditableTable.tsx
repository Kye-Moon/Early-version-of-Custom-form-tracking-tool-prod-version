import {useState} from "react";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/Primitives/Table";
import {PlusIcon} from "lucide-react";
import {Button} from "@/Primitives/Button/Button";
import {v4 as uuidv4} from 'uuid';
import {CreateVariationResourceInput} from "gql-types";

interface EditableTableProps<TData, TValue> {
	/**
	 * The column definition to render in the table
	 */
	columns: ColumnDef<TData, TValue>[];
	/**
	 * The data to render in the table (must match the column definition)
	 */
	data: TData[];

	setData: (data: (old: any) => any) => void;


	/**
	 * The default data to render in the table (must match the column definition)
	 */
	originalData: TData[];
	updateRow: (id: string, data: any) => void;
	addRow: (newRow: any) => void;
	resourceType?: string;
	deleteRow: (id: string) => void;
}


export default function EditableTable({
										  columns,
										  data,
										  setData,
										  originalData,
										  updateRow,
										  addRow,
										  deleteRow,
										  resourceType
									  }: EditableTableProps<any, any>) {

	const [editedRows, setEditedRows] = useState({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			editedRows,
			setEditedRows,
			revertData: (rowIndex: number) => {
				setData((old) =>
					old.map((row: any, index: number) =>
						index === rowIndex ? originalData[rowIndex] : row
					)
				);
			},
			updateRow: (rowIndex: number) => {
				console.log('updateRow with data', data[rowIndex])
				updateRow(data[rowIndex].id, data[rowIndex]);
			},
			updateData: (rowIndex: number, columnId: string, value: string) => {
				setData((old) =>
					old.map((row: any, index: number) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					})
				);
				// if the row is changed, update the row in the database
				if (data[rowIndex][columnId] !== value) {
					updateRow(data[rowIndex].id, {[columnId]: value});
				}

				// updateRow(data[rowIndex].id, value);
			},
			addRow: () => {
				const newRow: Omit<CreateVariationResourceInput, 'jobRecordId'> = {
					id: uuidv4(),
					type: resourceType ?? "UNKNOWN",
				};
				setData((old) => [...old, newRow]);
				addRow(newRow);
			},
			removeRow: (rowIndex: number) => {
				setData((old) => old.filter((row: any, index: number) => index !== rowIndex));
				deleteRow(data[rowIndex].id);
			},
		},
	});

	return (
		<>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<>
									{/*@ts-ignore*/}
									<td className={cell.column.columnDef.meta?.className}
										key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								</>

							))}
						</tr>
					))}
				</TableBody>
			</Table>
			<div className={'flex w-full justify-end my-2 bg-primary-foreground p-1'}>
				{/*@ts-ignore*/}
				<Button variant={'outline'} size={'sm'} onClick={table.options.meta?.addRow}>
					<PlusIcon className={'mr-2'} size={'20'}/>
					{'Row'}
				</Button>
			</div>
		</>

	);
};
