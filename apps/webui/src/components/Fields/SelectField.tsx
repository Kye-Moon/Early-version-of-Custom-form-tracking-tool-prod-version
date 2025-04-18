import {ElementsType, FormElement, FormElementInstance, SubmitFunction} from "form-types";
import {Label} from "@/Primitives/Label";
import {Input} from "@/Primitives/Input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import useDesigner from "@/Hooks/useDesigner";
import {RxDropdownMenu} from "react-icons/rx";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/Primitives/Form";
import {Switch} from "@/Primitives/Switch";
import {cn} from "@/Lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Primitives/Select";
import {Separator} from "@/Primitives/Seperator";
import {Button} from "@/Primitives/Button/Button";
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import toast from "react-hot-toast";
import {
	SelectCustomInstance,
	SelectExtraAttributes,
	selectPropertiesFormSchemaType,
	selectPropertiesSchema
} from "form-types/SelectField";

const type: ElementsType = "SelectField";


export const SelectFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes: SelectExtraAttributes
	}),
	designerBtnElement: {
		icon: RxDropdownMenu,
		label: "Select Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,

	validate: (formElement: FormElementInstance, currentValue: string): boolean => {
		const element = formElement as SelectCustomInstance;
		if (element.extraAttributes.required) {
			return currentValue.length > 0;
		}

		return true;
	},
};


function DesignerComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as SelectCustomInstance;
	const {label, required, placeHolder, helperText} = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label>
				{label}
				{required && "*"}
			</Label>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeHolder}/>
				</SelectTrigger>
			</Select>
			{helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
		</div>
	);
}

function FormComponent({
						   elementInstance,
						   submitValue,
						   isInvalid,
						   defaultValue,
					   }: {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}) {
	const element = elementInstance as SelectCustomInstance;

	const [value, setValue] = useState(defaultValue || "");
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(isInvalid === true);
	}, [isInvalid]);

	const {label, required, placeHolder, helperText, options} = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className={cn(error && "text-red-500")}>
				{label}
				{required && "*"}
			</Label>
			<Select
				defaultValue={value}
				onValueChange={(value) => {
					setValue(value);
					if (!submitValue) return;
					const valid = SelectFieldFormElement.validate(element, value);
					setError(!valid);
					submitValue(element.id, value);
				}}
			>
				<SelectTrigger className={cn("w-full", error && "border-red-500")}>
					<SelectValue placeholder={placeHolder}/>
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{helperText &&
				<p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
		</div>
	);
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as SelectCustomInstance;
	const {updateElement, setSelectedElement} = useDesigner();
	const form = useForm<selectPropertiesFormSchemaType>({
		resolver: zodResolver(selectPropertiesSchema),
		mode: "onSubmit",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
			placeHolder: element.extraAttributes.placeHolder,
			options: element.extraAttributes.options,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	function applyChanges(values: selectPropertiesFormSchemaType) {
		const {label, helperText, placeHolder, required, options} = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				placeHolder,
				required,
				options,
			},
		});

		toast.success("Changes saved successfully");

		setSelectedElement(null);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
				<FormField
					control={form.control}
					name="label"
					render={({field}) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input
									{...field}
									onKeyDown={(e) => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
								/>
							</FormControl>
							<FormDescription>
								The label of the field. <br/> It will be displayed above the field
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="placeHolder"
					render={({field}) => (
						<FormItem>
							<FormLabel>PlaceHolder</FormLabel>
							<FormControl>
								<Input
									{...field}
									onKeyDown={(e) => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
								/>
							</FormControl>
							<FormDescription>The placeholder of the field.</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="helperText"
					render={({field}) => (
						<FormItem>
							<FormLabel>Helper text</FormLabel>
							<FormControl>
								<Input
									{...field}
									onKeyDown={(e) => {
										if (e.key === "Enter") e.currentTarget.blur();
									}}
								/>
							</FormControl>
							<FormDescription>
								The helper text of the field. <br/>
								It will be displayed below the field.
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Separator/>
				<FormField
					control={form.control}
					name="options"
					render={({field}) => (
						<FormItem>
							<div className="flex justify-between items-center">
								<FormLabel>Options</FormLabel>
								<Button
									variant={"outline"}
									className="gap-2"
									onClick={(e) => {
										e.preventDefault(); // avoid submit
										form.setValue("options", field.value.concat("New option"));
									}}
								>
									<AiOutlinePlus/>
									Add
								</Button>
							</div>
							<div className="flex flex-col gap-2">
								{form.watch("options").map((option, index) => (
									<div key={index}
										 className="flex items-center justify-between gap-1">
										<Input
											placeholder=""
											value={option}
											onChange={(e) => {
												field.value[index] = e.target.value;
												field.onChange(field.value);
											}}
										/>
										<Button
											variant={"ghost"}
											size={"icon"}
											onClick={(e) => {
												e.preventDefault();
												const newOptions = [...field.value];
												newOptions.splice(index, 1);
												field.onChange(newOptions);
											}}
										>
											<AiOutlineClose/>
										</Button>
									</div>
								))}
							</div>

							<FormDescription>
								The helper text of the field. <br/>
								It will be displayed below the field.
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Separator/>
				<FormField
					control={form.control}
					name="required"
					render={({field}) => (
						<FormItem
							className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Required</FormLabel>
								<FormDescription>
									The helper text of the field. <br/>
									It will be displayed below the field.
								</FormDescription>
							</div>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Separator/>
				<Button className="w-full" type="submit">
					Save
				</Button>
			</form>
		</Form>
	);
}
