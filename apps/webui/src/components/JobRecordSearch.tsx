import {graphql} from "gql-types";
import {Label} from "@/Primitives/Label";
import {Input} from "@/Primitives/Input";
import JobSelect from "@/Components/JobSelect/JobSelect";
import {useJobRecordSearch} from "@/Context/JobRecordSearchContext";
import {useSuspenseQuery} from "@apollo/client";
import ComboBox from "@/Components/ComboBox/ComboBox";
import {Suspense, useState} from "react";
import {Button} from "@/Primitives/Button/Button";

const formSelectQuery = graphql(`
	query OrganisationFormSelect {
		formTemplates {
			id
			name
			category
		}
	}
`)

interface JobRecordSearchProps {
	hideJobSelect?: boolean;
}

export default function JobRecordSearch({hideJobSelect}: JobRecordSearchProps) {
	const {
		name,
		setName,
		jobId,
		setJobId,
		formId,
		setFormId,
		formCategory,
		setFormCategory,
		submittedBy,
		setSubmittedBy,
		clearAll,
		categories,
		forms
	} = useJobRecordSearch();
	const [formSelectOpen, setFormSelectOpen] = useState(false);
	const [formCategorySelectOpen, setFormCategorySelectOpen] = useState(false);

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
			{!hideJobSelect &&
				<div className="col-span-1">
					<Suspense fallback={<div>Loading...</div>}>
						<JobSelect width={'full'} value={jobId} setValue={setJobId}/>
					</Suspense>
				</div>
			}
			<div className="col-span-1 flex flex-col space-y-1 ">
				<Label htmlFor="form">Form</Label>
				<ComboBox
					width={'full'}
					open={formSelectOpen}
					setOpen={setFormSelectOpen}
					value={formId}
					setValue={(value) => setFormId(value)}
					options={forms}
					allowClear={true}
				/>
			</div>
			<div className="col-span-1 flex flex-col space-y-1 ">
				<Label htmlFor="formCategory">Form Category</Label>
				<ComboBox
					width={'full'}
					open={formCategorySelectOpen}
					setOpen={setFormCategorySelectOpen}
					value={formCategory}
					setValue={(value) => setFormCategory(value)}
					options={categories}
					allowClear={true}
				/>
			</div>
			<div className="col-span-1 mt-2">
				<Label htmlFor="submittedBy">Submitted by</Label>
				<Input
					value={submittedBy}
					onChange={(e) => setSubmittedBy(e.target.value)}
					type="text" name="submittedBy" id="submittedBy"/>
				<p onClick={() => setSubmittedBy('')}
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
