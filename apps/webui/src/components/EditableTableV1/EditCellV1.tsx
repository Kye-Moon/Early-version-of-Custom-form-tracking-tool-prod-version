//@ts-ignore
import {
	PencilIcon,
	SaveIcon,
	TrashIcon,
	XIcon,
} from "lucide-react";

// @ts-ignore
export default function EditCellV1({row, table}) {
	const meta = table.options.meta;
	const setEditedRows = (e: any) => {
		const elName = e.currentTarget.name;
		meta?.setEditedRows((old: []) => ({
			...old,
			[row.id]: !old[row.id],
		}));
		if (elName !== "edit") {
			e.currentTarget.name === "cancel" ? meta?.revertData(row.index) : meta?.updateRow(row.index);
		}
	};

	const removeRow = () => {
		meta?.removeRow(row.index);
	};

	return (
		<div className="flex justify-center">
			{meta?.editedRows[row.id] ? (
				<div className="flex mx-2 space-x-2 ">
					<button onClick={setEditedRows} name="done">
						<SaveIcon className="w-4 h-4 hover:text-green-500"/>
					</button>
					<button onClick={setEditedRows} name="cancel">
						<XIcon className="w-4 h-4 hover:text-destructive"/>
					</button>

				</div>
			) : (
				<div className="flex mx-2 space-x-2 ">
					<button onClick={setEditedRows} name="edit">
						<PencilIcon className="w-4 h-4 hover:text-primary"/>
					</button>
					<button onClick={removeRow} name="remove">
						<TrashIcon className="w-4 h-4 hover:text-destructive"/>
					</button>
				</div>
			)}
		</div>
	);
};
