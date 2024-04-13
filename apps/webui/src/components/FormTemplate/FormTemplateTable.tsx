import {FindAllFormTemplateQuery} from "gql-types";
import React from "react";
import TableEmptyState from "@/Components/TableEmptyState";
import DataTable from "@/Components/DataTable/DataTable";
import {
	baseFormTemplateTableColumns, FormTemplateTableColumn,
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

	const tableCols: FormTemplateTableColumn[] = formTemplates.map((formTemplate) => {
		return {
			id: formTemplate.id,
			name: formTemplate.name,
			description: formTemplate.description,
			category: formTemplate.category,
			status: formTemplate.status,
			autoAssign: formTemplate.autoAssign ?? false
		}
	})

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
				data={tableCols}
			/>
		</div>
	);
}
