import ComboBox from "@/Components/ComboBox/ComboBox";
import {useState} from "react";
import {Label} from "@/Primitives/Label";
import {useSuspenseQuery} from "@apollo/client";
import {jobSelectSearchJobs} from "@/Services/jobService";
import {JobSelectSearchQuery} from "gql-types";

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
	width?: string;
}

export default function JobSelect({value, setValue, width}: JobSelectProps) {
	const [open, setOpen] = useState(false);
	const {data} = useSuspenseQuery(jobSelectSearchJobs, {variables: {input: {}}});
	const jobs = data?.searchJobs?.map((job: JobSelectSearchQuery['searchJobs'][0]) => ({
		value: job.id,
		label: job.title ?? "-",
	})) || [];

	return (
		<div className={"flex flex-col space-y-1"}>
			<Label>Select Job</Label>
			<ComboBox
				open={open}
				setOpen={setOpen}
				value={value}
				setValue={setValue}
				options={jobs}
				width={width}
				allowClear={true}
			/>
		</div>
	);
}

