import {createColumnHelper} from "@tanstack/react-table";
import EditableTableCell from "@/Components/EditableTable/EditableTableCell";
import EditCell from "@/Components/EditableTable/EditCell";
import EditableTable from "@/Components/EditableTable/EditableTable";
import {useParams} from "@tanstack/react-router";
import useVariationResources from "@/Hooks/useVariationResources";
import {useEffect, useState} from "react";

type MaterialResource = {
	description: string;
	quantity: string;
	unitPrice: string;
};

const columnHelper = createColumnHelper<MaterialResource>();
const columns = [
	columnHelper.accessor("description", {
		header: "Description",
		cell: EditableTableCell,
		meta: {
			type: "text",
		},
	}),
	columnHelper.accessor("quantity", {
		header: "Units",
		cell: EditableTableCell,
		meta: {
			type: "text",
		},
	}),
	columnHelper.accessor("unitPrice", {
		header: "Cost per unit ($)",
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

export default function EditableMaterialsResourcesTable() {
	const params = useParams({from: "/layout/job-records/$jobRecordId/edit"});
	const {materialResources, addResource, updateResource,removeResource} = useVariationResources({variationId: params.jobRecordId});
	const [_data, setData] = useState(() => materialResources ? [...materialResources] : []);
	const [originalData, setOriginalData] = useState(() => materialResources ? [...materialResources] : []);

	useEffect(() => {
		setData(() => materialResources ? [...materialResources] : []);
		setOriginalData(() => materialResources ? [...materialResources] : []);
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
			resourceType={"MATERIAL"}
		/>
	)
}
