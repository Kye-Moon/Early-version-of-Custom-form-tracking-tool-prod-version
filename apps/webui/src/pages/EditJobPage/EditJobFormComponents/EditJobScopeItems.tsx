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

type ScopeItem = {
	description: string;
	title: string;
	reference: string;
}

const columnHelper = createColumnHelper<ScopeItem>();
const columns = [
	columnHelper.accessor("title", {
		header: "Title",
		cell: EditableTableCell,
		meta: {
			type: "text",
			width: 800
		},
	}),
	columnHelper.accessor("reference", {
		header: "Reference",
		cell: EditableTableCell,
		meta: {
			type: "text",
			width: 300
		},
	}),
	columnHelper.display({
		id: "edit",
		cell: EditCell,
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

	const [create] = useMutation(createJobScopeItem, {
		refetchQueries: [{query: getJobScopeItems, variables: {jobId: jobId}}],
		optimisticResponse: {
			__typename: "Mutation",
			createJobScopeItem: {
				__typename: "JobScopeItem",
				id: "temp",
				jobId: jobId,
				title: "",
				reference: "",
				description: ""
			}
		}
	})

	const [update] = useMutation(updateJobScopeItem, {
		refetchQueries: [{query: getJobScopeItems, variables: {jobId: jobId}}],
	})
	const [deleteScopeItem] = useMutation(deleteJobScopeItem, {
		refetchQueries: [{query: getJobScopeItems, variables: {jobId: jobId}}]
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
		await deleteScopeItem({variables: {id: id}})
	}

	return (
		<EditableTable
			columns={columns}
			data={_data}
			originalData={originalData}
			setData={setData}
			updateRow={updateScopeItem}
			addRow={addScopeItem}
			deleteRow={removeScopeItem}
		/>
	)
}
