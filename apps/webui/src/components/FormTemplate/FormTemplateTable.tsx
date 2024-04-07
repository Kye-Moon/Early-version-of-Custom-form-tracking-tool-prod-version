import {FindAllFormTemplateQuery} from "gql-types";
import React from "react";
import TableEmptyState from "@/Components/TableEmptyState";
import DataTable from "@/Components/DataTable/DataTable";
import {
	baseFormTemplateTableColumns,
	formTemplateTableColumns
} from "@/Components/FormTemplate/FormtemplateTableColumns";

interface FormTemplateTableProps {
	formTemplates: FindAllFormTemplateQuery['formTemplates']
	showActions?: boolean;
}

export default function FormTemplateTable({
											  formTemplates,
											  showActions = true
										  }: FormTemplateTableProps) {

	//Empty state
	if (formTemplates.length === 0) {
		return (<TableEmptyState mainText={"No templates found"}/>)
	}
	return (
		<div>
			<DataTable
				searchColumn={"name"}
				searchPlaceholder={"Search by name..."}
				columns={showActions ? formTemplateTableColumns : baseFormTemplateTableColumns}
				data={formTemplates}
			/>
		</div>
	);
}
