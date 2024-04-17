//@ts-ignore
import {
	CheckCircle,
	CheckSquare,
	CheckSquareIcon,
	Edit2Icon,
	PencilIcon,
	SaveIcon,
	TrashIcon,
	XIcon,
	XSquare,
	XSquareIcon
} from "lucide-react";

// @ts-ignore
export default function EditCell({row, table}) {
	const meta = table.options.meta
	//@ts-ignore
	const removeRow = () => {
		meta?.removeRow(row.index);
	};

	return (
		<div className="text-right">
			<button onClick={removeRow} name="remove">
				<TrashIcon className="w-4 h-4 hover:text-destructive"/>
			</button>
		</div>
	);
}
