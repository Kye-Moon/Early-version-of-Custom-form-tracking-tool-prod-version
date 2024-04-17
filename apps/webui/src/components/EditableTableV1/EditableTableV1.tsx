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
	setOriginalData: (data: (old: any) => any) => void;
	updateRow: (id: string, data: any) => void;
	addRow: (newRow: any) => void;
	resourceType?: string;
	deleteRow: (id: string) => void;
}


export default function EditableTableV1({
											columns,
											data,
											setData,
											originalData,
											updateRow,
											addRow,
											deleteRow,
											resourceType,
											setOriginalData
										}: EditableTableProps<any, any>) {
	const [editedRows, setEditedRows] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			editedRows,
			setEditedRows,
			revertData: (rowIndex: number, revert: boolean) => {
				if (revert) {
					setData((old) =>
						old.map((row: any, index: number) =>
							index === rowIndex ? originalData[rowIndex] : row
						)
					);
				} else {
					setOriginalData((old) =>
						old.map((row: any, index: number) => (index === rowIndex ? data[rowIndex] : row))
					);
				}
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
			},
			updateRow: async (rowIndex: number) => {
				setIsLoading(true);
				await updateRow(data[rowIndex].id, data[rowIndex]);
				setIsLoading(false);
			},
			addRow: () => {
				const newRow: any = {
					id: uuidv4(),
				};
				setData((old) => [...old, newRow]);
				addRow(newRow);
			},
			removeRow: async (rowIndex: number) => {
				setIsLoading(true);
				await deleteRow(data[rowIndex].id);
				setIsLoading(false);
				setData((old) => old.filter((row: any, index: number) => index !== rowIndex));
			},
			isLoading,
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
						<tr key={row.id} className={'border-b-2 h-10'}>
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
