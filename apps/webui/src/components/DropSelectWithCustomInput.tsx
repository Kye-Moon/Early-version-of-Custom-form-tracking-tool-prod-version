import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Primitives/Select";
import {Input} from "@/Primitives/Input";
import {Separator} from "@/Primitives/Seperator";
import {useState} from "react";

/**
 * The option type for the DropSelect component
 */
export interface DropSelectOption {
	value: string;
	label: string;
}

/**
 * DropSelect Props for the DropSelect component
 */
interface DropSelectProps {
	placeholder: string;
	defaultValue?: string;
	onChange: (value: string) => void;
	options?: DropSelectOption[];
	width?: string;
	field?: any;
	value?: string;
}

/**
 * A Select component that allows the user to select an option from a list of options in a dropdown
 * @param placeholder the placeholder text of the Select
 * @param defaultValue the default value of the Select
 * @param onChange function to set the value of the Select
 * @param options the options of the Select
 * @constructor
 */
const DropSelectWithCustomInput = ({
									   placeholder,
									   defaultValue,
									   onChange,
									   options,
									   width = '180',
									   field,
								   }: DropSelectProps) => {
	// This function is called whenever the custom input changes.
	const handleCustomInputChange = (event: { target: { value: any; }; }) => {
		const newValue = event.target.value;
		// Use the field.onChange or a similar method provided by your form library
		// to update the form state with the new custom value.
		field.onChange(newValue);
	};

	return (
		<Select onValueChange={(value) => onChange(value)}
				defaultValue={defaultValue}>
			<SelectTrigger className={`w-[${width}px]`}>
				<SelectValue placeholder={placeholder}/>
			</SelectTrigger>
			<SelectContent>
				<div className={'mx-1'}>
					<h3 className={'text-xs'}>Custom</h3>
					<Input onChange={handleCustomInputChange} defaultValue={field.value}/>
				</div>
				<Separator className={'my-2'}/>
				{options?.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default DropSelectWithCustomInput;
