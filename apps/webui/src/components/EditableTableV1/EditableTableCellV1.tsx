import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "@/Primitives/Input";

// @ts-ignore
export default function EditableTableCellV1({getValue, row, column, table}) {
	const initialValue = getValue()
	const tableMeta = table.options.meta
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])


	const onBlur = () => {
		tableMeta?.updateData(row.index, column.id, value)
	}
	if (tableMeta?.editedRows[row.id]) {
		return (
			<Input
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
				onBlur={onBlur}
				type={column.columnDef.meta?.type || "text"}
			/>
		)
	}
	return (
		<div className={'flex w-full  px-4'}>
			<span>
				{value}
			</span>
		</div>
	)

}
