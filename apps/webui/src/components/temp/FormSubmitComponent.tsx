import React, {useState} from "react";
import {FormElementInstance} from "form-types";
import {FormElements} from "@/Components/temp/FormElements";

interface FormSubmitComponentProps {
	content: FormElementInstance[];
	submitValue: (key: string, value: string) => void; // Function to update form values
	isInvalid: (id: string) => boolean; // Function to check if a field is invalid
	getDefaultValue: (id: string) => string; // Function to get default values for Fields
}

function FormSubmitComponent({
								 content,
								 submitValue,
								 isInvalid,
								 getDefaultValue
							 }: FormSubmitComponentProps) {
	const [renderKey, setRenderKey] = useState(new Date().getTime());

	return (
		<div className="flex  w-full h-full ">
			<div
				key={renderKey}
				className=" flex flex-col gap-4 mx-1 flex-grow  w-full py-2 overflow-y-auto "
			>
				{content.map((element) => {
					const FormElement = FormElements[element.type].formComponent;
					return (
						<FormElement
							key={element.id}
							elementInstance={element}
							submitValue={submitValue}
							isInvalid={isInvalid(element.id)} // Determines if the field should display as invalid
							defaultValue={getDefaultValue(element.id)} // Ge
						/>
					);
				})}
			</div>
		</div>
	);
}

export default FormSubmitComponent;
