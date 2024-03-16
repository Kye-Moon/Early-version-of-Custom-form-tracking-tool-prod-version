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
    quantity: string;
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
    columnHelper.accessor("quantity", {
        header: "$/unit or $/hour",
        cell: EditableTableCell,
        meta: {
            type: "dollars",
        },
    }),
    columnHelper.accessor("unitPrice", {
        header: "Units or Hours",
        cell: EditableTableCell,
        meta: {
            type: "text",
        },
    }),
    columnHelper.display({
        id: "edit",
        cell: EditCell,
    }),
];

export default function EditableEquipmentResourcesTable() {
    const params = useParams({from: "/layout/job-records/$jobRecordId/edit"});
    const {equipmentResources, addResource, updateResource, removeResource} = useVariationResources({variationId: params.jobRecordId});
    const [_data, setData] = useState(() => equipmentResources ? [...equipmentResources] : []);
    const [originalData, setOriginalData] = useState(() => equipmentResources ? [...equipmentResources] : []);

    useEffect(() => {
        setData(() => equipmentResources ? [...equipmentResources] : []);
        setOriginalData(() => equipmentResources ? [...equipmentResources] : []);
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
            resourceType={"EQUIPMENT"}
        />
    )
}
