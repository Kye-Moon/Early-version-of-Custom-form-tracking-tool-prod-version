import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";
import {useState} from "react";
import {Label} from "@/Primitives/Label";
import ComboBox from "@/Components/ComboBox/ComboBox";
import {FormElementInstance} from "form-types";
import {useFormContext} from "react-hook-form";
import {
	NewJobRecordFormType
} from "@/Components/JobRecords/NewJobRecordDialog/NewJobRecordForm/NewJobRecordFormSchema";

const query = graphql(`
	query JobFormSelect($jobId: String!) {
		job(id: $jobId) {
			jobForms {
				id
				name
				description
				category
				status
				structure
			}
		},
	}
`)

interface JobFormsCellProps {
	jobId: string;
	setFormStructure: (value: FormElementInstance[]) => void;
}

export default function JobFormSelect({jobId, setFormStructure}: JobFormsCellProps) {
	const [selectedForm, setSelectedForm] = useState('');
	const [open, setOpen] = useState(false);
	const {data} = useSuspenseQuery(query, {variables: {jobId: jobId}, skip: !jobId})
	const { setValue} = useFormContext<NewJobRecordFormType>();

	const items = data?.job.jobForms?.map((item: any) => ({
		value: item.id,
		label: item.name,
		content: item.structure
	})) || [];

	return (
		<div>
			<div className={"flex flex-col space-y-1"}>
				<Label>Select Form</Label>
				<ComboBox
					open={open}
					setOpen={setOpen}
					value={selectedForm}
					setValue={(value) => {
						setSelectedForm(value);
						setValue('formId', value);
						const formStructure = items.find((item) => item.value === value)?.content;
						setFormStructure(formStructure.elements);
					}}
					options={items}
				/>
			</div>
		</div>
	)
}
