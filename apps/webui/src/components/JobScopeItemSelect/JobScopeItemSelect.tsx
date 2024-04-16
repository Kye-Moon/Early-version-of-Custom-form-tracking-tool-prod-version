import ComboBox from "@/Components/ComboBox/ComboBox";
import {useState} from "react";
import {Label} from "@/Primitives/Label";
import {useSuspenseQuery} from "@apollo/client";
import {GetJobScopeItemsQuery} from "gql-types";
import {getJobScopeItems} from "@/Services/jobScopeItemService";

/*
 * CustomerSelect Props
 */
interface JobSelectProps {
	/**
	 * Value of the ComboBox (the selected job)
	 */
	value: string;
	/**
	 * Function to set the value of the ComboBox (the selected job)
	 * @param value
	 */
	setValue: (value: string) => void;
	jobId: string;
}

const generateReferenceString = (reference: string | null | undefined, title: string | null | undefined) => {
	let referenceString = "";
	if (reference) {
		referenceString = `${reference}`;
	}
	if (reference && title) {
		referenceString += " - ";
	}
	if (title) {
		referenceString += title;
	}
	return referenceString;
}

export default function JobScopeItemSelect({value, setValue, jobId}: JobSelectProps) {
	const [open, setOpen] = useState(false);
	const {data} = useSuspenseQuery(getJobScopeItems, {
		variables: {jobId: jobId},
		skip: !jobId,
	});
	const items = data?.jobScopeItems?.map((item: GetJobScopeItemsQuery['jobScopeItems'][0]) => ({
		value: item.id,
		label: generateReferenceString(item.reference, item.title),
	})).filter((item) => item.label) || [];

	return (
		<div className={"flex flex-col space-y-1"}>
			<Label>Select Scope Item</Label>
			<ComboBox
				open={open}
				setOpen={setOpen}
				value={value}
				setValue={setValue}
				options={items}
			/>
		</div>
	);
}

