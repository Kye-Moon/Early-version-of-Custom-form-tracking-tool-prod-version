import {useSuspenseQuery} from "@apollo/client";
import {findFormTemplateQuery} from "@/Services/formTemplate";
import FormBuilder from "@/Components/temp/FormBuilder";

interface EditRecordTemplateCellProps {
	templateId: string;
}

export default function EditRecordTemplateCell({templateId}: EditRecordTemplateCellProps) {
	const {data} = useSuspenseQuery(findFormTemplateQuery, {variables: {id: templateId}});
	return (
		<div>
			<FormBuilder form={data.formTemplate}/>
		</div>
	)
}
