import {useSuspenseQuery} from "@apollo/client";
import {findAllFormTemplateQuery} from "@/Services/formTemplate";
import FormTemplateTable from "@/Components/FormTemplate/FormTemplateTable";

export default function RecordTemplatesCell() {
	const {data} = useSuspenseQuery(findAllFormTemplateQuery);
	return (
		<div>
			<FormTemplateTable formTemplates={data?.formTemplates}/>
		</div>
	)
}
