import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import useDesigner from "@/Hooks/useDesigner";
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
import {Checkbox} from "@/Primitives/Checkbox";
import {
	ElementsType,
	FormElement,
	FormElementInstance,
	SubmitFunction
} from "form-types";
import {Label} from "@/Primitives/Label";
import {Input} from "@/Primitives/Input";
import {CheckCircleIcon} from "lucide-react";
import {
	CheckBoxCustomInstance,
	checkBoxExtraAttributes, checkBoxPropertiesFormSchemaType,
	checkBoxPropertiesSchema
} from "form-types/CheckboxField";

const type: ElementsType = "CheckboxField";
export const CheckboxFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes: checkBoxExtraAttributes
	}),
	designerBtnElement: {
		icon: CheckCircleIcon,
		label: "CheckBox Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,

	validate: (formElement: FormElementInstance, currentValue: string): boolean => {
		const element = formElement as CheckBoxCustomInstance;
		if (element.extraAttributes.required) {
			return currentValue === "true";
		}

		return true;
	},
};


function DesignerComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CheckBoxCustomInstance;
	const {label, required, helperText} = element.extraAttributes;
	const id = `checkbox-${element.id}`;
	return (
		<div className="flex items-top space-x-2">
			<Checkbox id={id}/>
			<div className="grid gap-1.5 leading-none">
				<Label htmlFor={id}>
					{label}
					{required && "*"}
				</Label>
				{helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
			</div>
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
	const element = elementInstance as CheckBoxCustomInstance;

	const [value, setValue] = useState<boolean>(defaultValue === "true" ? true : false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setError(isInvalid === true);
	}, [isInvalid]);

	const {label, required, placeHolder, helperText} = element.extraAttributes;
	const id = `checkbox-${element.id}`;
	return (
		<div className="flex items-top space-x-2">
			<Checkbox
				id={id}
				checked={value}
				className={cn(error && "border-red-500")}
				onCheckedChange={(checked) => {
					let value = false;
					if (checked === true) value = true;

					setValue(value);
					if (!submitValue) return;
					const stringValue = value ? "true" : "false";
					const valid = CheckboxFieldFormElement.validate(element, stringValue);
					setError(!valid);
					submitValue(element.id, stringValue);
				}}
			/>
			<div className="grid gap-1.5 leading-none">
				<Label htmlFor={id} className={cn(error && "text-red-500")}>
					{label}
					{required && "*"}
				</Label>
				{helperText && (
					<p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>
				)}
			</div>
		</div>
	);
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CheckBoxCustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<checkBoxPropertiesFormSchemaType>({
		resolver: zodResolver(checkBoxPropertiesSchema),
		mode: "onBlur",
		defaultValues: {
			label: element.extraAttributes.label,
			helperText: element.extraAttributes.helperText,
			required: element.extraAttributes.required,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	function applyChanges(values: checkBoxPropertiesFormSchemaType) {
		const {label, helperText, required} = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				required,
			},
		});
	}

	return (
		<Form {...form}>
			<form
				onBlur={form.handleSubmit(applyChanges)}
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="space-y-3"
			>
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
			</form>
		</Form>
	);
}
