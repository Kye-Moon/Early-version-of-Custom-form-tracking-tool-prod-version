import {createColumnHelper} from "@tanstack/react-table";
import EditableTableCell from "@/Components/EditableTable/EditableTableCell";
import EditCell from "@/Components/EditableTable/EditCell";
import EditableTable from "@/Components/EditableTable/EditableTable";
import {useParams} from "@tanstack/react-router";
import useVariationResources from "@/Hooks/useVariationResources";
import {useEffect, useState} from "react";

type MiscResource = {
	description: string;
	unitPrice: string;
};

const columnHelper = createColumnHelper<MiscResource>();
const columns = [
	columnHelper.accessor("description", {
		header: "Description",
		cell: EditableTableCell,
		meta: {
			type: "text",
		},
	}),
	columnHelper.accessor("unitPrice", {
		header: "Cost ($)",
		cell: EditableTableCell,
		meta: {
			type: "dollars",
		},
	}),
	columnHelper.display({
		id: "edit",
		cell: EditCell,
	}),
];

export default function EditableMiscResourcesTable() {
	const params = useParams({from: "/layout/job-records/$jobRecordId/edit"});
	const {otherResources, addResource, updateResource,removeResource} = useVariationResources({variationId: params.jobRecordId});
	const [_data, setData] = useState(() => otherResources ? [...otherResources] : []);
	const [originalData, setOriginalData] = useState(() => otherResources ? [...otherResources] : []);

	useEffect(() => {
		setData(() => otherResources ? [...otherResources] : []);
		setOriginalData(() => otherResources ? [...otherResources] : []);
	}, []);


	return (
		<EditableTable
			columns={columns}
			data={_data}
			originalData={originalData}
			setData={setData}
			updateRow={updateResource}
			addRow={addResource}
			deleteRow={removeResource}
			resourceType={"OTHER"}
		/>
	)
}
