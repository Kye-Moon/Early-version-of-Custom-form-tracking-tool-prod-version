import {Label} from "@/Primitives/Label";
import {Input} from "@/Primitives/Input";
import JobSelect from "@/Components/JobSelect/JobSelect";
import {useJobRecordSearch} from "@/Context/JobRecordSearchContext";
import ComboBox from "@/Components/ComboBox/ComboBox";
import {Suspense, useState} from "react";
import {Button} from "@/Primitives/Button/Button";
import {useJobSearch} from "@/Context/JobSearchContext";
import ProjectSelect from "@/Components/ProjectSelect/ProjectSelect";
import {JobStatusSelectOptions} from "@/Constants/constants";

interface JobSearchProps {
	hideProjectSelect?: boolean;
}

export default function JobSearch({hideProjectSelect}: JobSearchProps) {
	const {
		name,
		setName,
		clearAll,
		projectId,
		setProjectId,
		status,
		setStatus,
		customer,
		setCustomer,
	} = useJobSearch();
	const [statusSelectOpen, setStatusSelectOpen] = useState(false);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-0 items-center">
			<div className="col-span-1 mt-2">
				<Label htmlFor="name">Name</Label>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Search by name"
					type="text"
					id="name"
				/>
				<p onClick={() => setName('')}
				   className={'underline text-gray-400 text-xs cursor-pointer hover:text-primary'}>Clear</p>
			</div>
			{!hideProjectSelect && (
				<div className="col-span-1">
					<Suspense fallback={<div>Loading...</div>}>
						<ProjectSelect value={projectId} setValue={setProjectId}/>
					</Suspense>
				</div>
			)}
			<div className="col-span-1 flex flex-col space-y-1 ">
				<Label htmlFor="form">Status</Label>
				<ComboBox
					width={'full'}
					open={statusSelectOpen}
					setOpen={setStatusSelectOpen}
					value={status}
					setValue={(value) => setStatus(value)}
					options={JobStatusSelectOptions}
					allowClear={true}
				/>
			</div>
			<div className="col-span-1 mt-2">
				<Label htmlFor="customer">Customer</Label>
				<Input
					value={customer}
					onChange={(e) => setCustomer(e.target.value)}
					placeholder="Search by customer"
					type="text"
					id="customer"
				/>
				<p onClick={() => setName('')}
				   className={'underline text-gray-400 text-xs cursor-pointer hover:text-primary'}>Clear</p>
			</div>
			<div className="col-span-3 flex justify-end">
				<Button onClick={() => clearAll()} variant={'ghost'} size={'xs'}>
					Clear All Filters
				</Button>
			</div>
		</div>
	)
}
