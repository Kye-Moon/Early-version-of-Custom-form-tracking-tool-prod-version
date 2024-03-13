import {cn} from "@/Lib/utils";
import {Button} from "@/Primitives/Button/Button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/Primitives/Command";
import {Popover, PopoverContent, PopoverTrigger} from "@/Primitives//Popover";
import * as React from "react";
import {Check, ChevronsUpDown} from "lucide-react";

/**
 * ComboBox Option type
 */
export interface ComboBoxOption {
	/**
	 * Value of the option
	 */
	value: string;
	/**
	 * Label of the option
	 */
	label: string;
}

/**
 * ComboBox Props
 * ComboBoxProps
 *  {boolean} [open] - Whether the ComboBox is open
 *  {function} [setOpen] - Function to set the open state
 *  {string} value - The value of the ComboBox
 *  {function} setValue - Function to set the value of the ComboBox
 *  {ComboBoxOption[]} options - The options of the ComboBox
 */
export interface ComboBoxProps {
	open?: boolean;
	setOpen: (open: boolean) => void;
	value: string;
	setValue: (value: string) => void;
	options: ComboBoxOption[];
}

/**
 * A ComboBox component that allows the user to select an option from a list of options in a dropdown with a search input
 * @param open whether the ComboBox is open
 * @param setOpen function to set the open state
 * @param value the value of the ComboBox
 * @param setValue function to set the value of the ComboBox
 * @param options the options of the ComboBox
 * @constructor
 */
const ComboBox = ({open, setOpen, value, setValue, options}: ComboBoxProps) => {
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size={"sm"}
					role="combobox"
					aria-expanded={open}
					className="w-[400px] h-8 justify-between"
				>
					{value ? options.find((framework) => framework.value === value)?.label : "Select..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0">
				<Command>
					<CommandInput placeholder="Search..."/>
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandGroup>
						{options.map((framework) => (
							<CommandItem
								key={framework.value}
								onSelect={() => {
									setValue(framework.value); // Set the selected value directly
									setOpen(false); // Close the ComboBox after selection
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === framework.value ? "opacity-100" : "opacity-0"
									)}
								/>
								{framework.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ComboBox;
