import {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import EditableTableCell from "@/Components/EditableTable/EditableTableCell";
import EditCell from "@/Components/EditableTable/EditCell";
import EditableTable from "@/Components/EditableTable/EditableTable";
import {useMutation, useSuspenseQuery} from "@apollo/client";
import {CreateJobScopeItemInput, UpdateJobScopeItemInput} from "gql-types";
import {
	createJobScopeItem,
	deleteJobScopeItem,
	getJobScopeItems,
	updateJobScopeItem
} from "@/Services/jobScopeItemService";
import EditableTableV1 from "@/Components/EditableTableV1/EditableTableV1";
import EditableTableCellV1 from "@/Components/EditableTableV1/EditableTableCellV1";
import EditCellV1 from "@/Components/EditableTableV1/EditCellV1";
import toast from "react-hot-toast";

type ScopeItem = {
	description: string;
	title: string;
	reference: string;
}

const columnHelper = createColumnHelper<ScopeItem>();
const columns = [
	columnHelper.accessor("title", {
		header: "Title",
		cell: EditableTableCellV1,
		meta: {
			type: "text",
			width: 800,
			className: "w-screen"
		},
	}),
	columnHelper.accessor("reference", {
		header: "Reference",
		cell: EditableTableCellV1,
		meta: {
			type: "text",
			width: 300,
			className: "w-screen"
		},
	}),
	columnHelper.display({
		id: "edit",
		cell: (props) => (
			<div className={'flex justify-end mr-2'}>
				<EditCellV1 {...props} />
			</div>
		),

		meta: {
			width: 80

		}
	}),
];

export default function EditJobScopeItems({jobId}: { jobId: string }) {
	const {data} = useSuspenseQuery(getJobScopeItems, {variables: {jobId: jobId}})
	const [_data, setData] = useState(() => data?.jobScopeItems ? [...data.jobScopeItems] : [])
	const [originalData, setOriginalData] = useState(() => data?.jobScopeItems ? [...data.jobScopeItems] : [])

	useEffect(() => {
		setData(() => data?.jobScopeItems ? [...data.jobScopeItems] : []);
		setOriginalData(() => data?.jobScopeItems ? [...data.jobScopeItems] : []);
	}, [data]);

	const [create] = useMutation(createJobScopeItem)

	const [update] = useMutation(updateJobScopeItem, {
		onCompleted: () => {
			toast.dismiss()
			toast.success("Scope item updated")
		}
	})
	const [deleteScopeItem] = useMutation(deleteJobScopeItem, {
		onCompleted: () => {
			toast.dismiss()
			toast.success("Scope item deleted")
		}
	})

	const addScopeItem = async (scopeItem: CreateJobScopeItemInput) => {
		await create({
			variables: {
				input: {
					id: scopeItem.id,
					title: scopeItem.title,
					reference: scopeItem.reference,
					jobId: jobId
				}
			}
		})
	}

	const updateScopeItem = async (id: string, scopeItem: UpdateJobScopeItemInput) => {
		toast.loading("Updating scope item")
		await update({
			variables: {
				input: {
					jobId: scopeItem.jobId,
					description: scopeItem.description,
					title: scopeItem.title,
					reference: scopeItem.reference,
					id: id
				}
			}
		})
	}

	const removeScopeItem = async (id: string) => {
		toast.loading("Deleting scope item")
		await deleteScopeItem({variables: {id: id}})
	}

	return (
		<EditableTableV1
			columns={columns}
			data={_data}
			setOriginalData={setOriginalData}
			originalData={originalData}
			setData={setData}
			updateRow={updateScopeItem}
			addRow={addScopeItem}
			deleteRow={removeScopeItem}
		/>
	)
}
