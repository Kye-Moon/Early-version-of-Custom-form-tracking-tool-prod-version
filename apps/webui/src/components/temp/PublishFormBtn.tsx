import {startTransition, useTransition} from "react";
import {FaSpinner} from "react-icons/fa";
import {MdOutlinePublish} from "react-icons/md";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/Primitives/AlertDialog"
import {Button} from "@/Primitives/Button/Button";
import {useNavigate} from "@tanstack/react-router";
import {useMutation} from "@apollo/client";
import {updateFormTemplateMutation} from "@/Services/formTemplate";
import toast from "react-hot-toast";
import useDesigner from "@/Hooks/useDesigner";

function PublishFormBtn({id}: { id: string }) {
	const navigate = useNavigate();
	const {elements} = useDesigner();

	const [updateFormTemplate, {loading}] = useMutation(updateFormTemplateMutation, {
		onCompleted: async () => {
			toast.success("Form published");
			await navigate({to: `/record-templates`});
		},
		onError: (error) => {
			toast.error("Failed to publish form, please try again");
		},
	});

	async function publishForm() {
		try {
			await updateFormTemplate({
				variables: {
					input: {
						id,
						structure: {elements: elements},
						status: "ACTIVE",
					}
				},
			});
		} catch (error) {
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="gap-2 text-white bg-primary">
					<MdOutlinePublish className="h-4 w-4"/>
					Publish
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. After publishing you will not be able to edit
						this form. <br/>
						<br/>
						<span className="font-medium">
              By publishing this form you will be able to assign it to jobs and have crew members fill it out.
            </span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={async (e) => {
							e.preventDefault();
							await publishForm();
						}}
					>
						Proceed {loading && <FaSpinner className="animate-spin"/>}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default PublishFormBtn;
