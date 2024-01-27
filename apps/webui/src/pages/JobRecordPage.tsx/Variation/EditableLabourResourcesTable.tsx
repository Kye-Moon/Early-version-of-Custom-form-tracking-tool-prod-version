import {createColumnHelper} from "@tanstack/react-table";
import EditableTableCell from "@/Components/EditableTable/EditableTableCell";
import EditCell from "@/Components/EditableTable/EditCell";
import EditableTable from "@/Components/EditableTable/EditableTable";
import {useEffect, useState} from "react";
import useVariationResources from "@/Hooks/useVariationResources";
import {useParams} from "@tanstack/react-router";

export type LabourResource = {
    id?: string;
    description?: string | null;
    hours?: number | null;
    rate?: number | null;
    people?: number | null;
};

const columnHelper = createColumnHelper<LabourResource>();
const columns = [
    columnHelper.accessor("description", {
        header: "Description",
        cell: EditableTableCell,
        meta: {
            type: "text",
        },
    }),
    columnHelper.accessor("hours", {
        header: "Hours",
        cell: EditableTableCell,
        meta: {
            type: "text",
			className: 'w-28'
        },
    }),
    columnHelper.accessor("rate", {
        header: "Rate ($)",
        cell: EditableTableCell,
        meta: {
            type: "dollars",
			className: 'w-28'
		},
    }),
    columnHelper.accessor("numPeople", {
        header: "# People",
        cell: EditableTableCell,
        meta: {
            type: "text",
			className: 'w-28'
		},
    }),
    columnHelper.display({
        id: "edit",
        cell: EditCell,
		meta: {
			className: 'w-6'
		}
    }),
];


export default function EditableLabourResourcesTable() {
    const params = useParams({from: "/layout/job-records/$jobRecordId/edit"});
    const {labourResources, addResource, updateResource,removeResource} = useVariationResources({variationId: params.jobRecordId});
    const [_data, setData] = useState(() => labourResources ? [...labourResources] : []);
    const [originalData, setOriginalData] = useState(() => labourResources ? [...labourResources] : []);

    useEffect(() => {
        setData(() => labourResources ? [...labourResources] : []);
        setOriginalData(() => labourResources ? [...labourResources] : []);
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
            resourceType={"LABOUR"}
        />
    )
}
