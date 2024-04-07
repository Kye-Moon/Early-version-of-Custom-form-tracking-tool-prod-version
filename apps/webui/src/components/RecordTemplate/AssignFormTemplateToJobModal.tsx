import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/Primitives/Dialog";
import React, {Suspense} from "react";
import JobSelect from "@/Components/JobSelect/JobSelect";
import {useMutation} from "@apollo/client";
import {createJobFormMutation} from "@/Services/jobForm";
import toast from "react-hot-toast";
import SelectLoading from "@/Components/Loading/SelectLoading";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";

interface AssignFormTemplateToJobModalProps {
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	formName: string;
	templateId: string;
}

export default function AssignFormTemplateToJobModal({
														 isOpen,
														 setOpen,
														 formName,
														 templateId
													 }: AssignFormTemplateToJobModalProps) {
	const [selectedJob, setSelectedJob] = React.useState<string>("");
	const [assign, {loading}] = useMutation(createJobFormMutation,{
		onCompleted: () => {
			toast.success("Form assigned successfully");
			setOpen(false);
		},
		onError: (error) => {
			toast.error(error.message);
		}
	});

	const handleAssignForm = async () => {
		if (selectedJob === "") {
			toast.error("Please select a job");
			return;
		}
		await assign({variables: {input: {jobId: selectedJob, formTemplateId: templateId}}});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent className={"max-w-xl"}>
				<DialogHeader>
					<DialogTitle>{"Assign " + '"' + formName + '"' + " to a job"}</DialogTitle>
				</DialogHeader>
				<p className={'text-sm text-primary/50'}>Select a job to assign this form to</p>
				<Suspense fallback={<SelectLoading/>}>
					<JobSelect value={selectedJob} setValue={setSelectedJob}/>
				</Suspense>
				<div className={"flex justify-end mt-4"}>
					<LoadingButton
						type={"submit"}
						label={"Assign"}
						loadingStatus={loading}
						onClick={handleAssignForm}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
