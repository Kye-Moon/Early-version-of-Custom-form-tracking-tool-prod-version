import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "@/Primitives/Input";

// @ts-ignore
export default function EditableTableCell({getValue, row, column, table}) {
	const initialValue = getValue()
	const tableMeta = table.options.meta
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])


	const onBlur = () => {
		tableMeta?.updateData(row.index, column.id, value)
	}

	return (
		<Input
			value={value}
			onChange={e => setValue(e.target.value)}
			onBlur={onBlur}
			type={column.columnDef.meta?.type || "text"}
		/>
	)
}
