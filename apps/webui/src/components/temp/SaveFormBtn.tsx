import React, {useTransition} from "react";
import {Button} from "@/Primitives/Button/Button";
import {HiSaveAs} from "react-icons/hi";
import useDesigner from "@/Hooks/useDesigner";
import {FaSpinner} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {updateFormTemplateMutation} from "@/Services/formTemplate";
import toast from "react-hot-toast";

function SaveFormBtn({id, saveAndPublish = false}: { id: string, saveAndPublish?: boolean }) {
	const {elements,formName,formDescription} = useDesigner();
	const [updateFormTemplate, {loading}] = useMutation(updateFormTemplateMutation, {
		onCompleted: () => {
			toast.success("Form saved");
		},
		onError: (error) => {
			toast.error("Failed to save form, please try again");
		},
	});
	const updateFormContent = async () => {
		try {
			await updateFormTemplate({
				variables: {
					input: {
						id,
						name: formName,
						description: formDescription,
						structure: {elements: elements},
						...(saveAndPublish && {status: "ACTIVE"}),
					}
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Button
			variant={"outline"}
			className="gap-2"
			disabled={false}
			onClick={() => updateFormContent()}
		>
			{loading ? <FaSpinner className="animate-spin h-4 w-4"/> : <><HiSaveAs
				className="h-4 w-4"/>Save</>}
		</Button>
	);
}

export default SaveFormBtn;
