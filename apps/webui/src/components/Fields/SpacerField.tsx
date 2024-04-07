"use client";

import {ElementsType, FormElement, FormElementInstance} from "form-types";
import {Label} from "@/Primitives/Label";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import useDesigner from "@/Hooks/useDesigner";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Primitives/Form";
import {LuSeparatorHorizontal} from "react-icons/lu";
import {Slider} from "@/Primitives/Slider";
import {
	propertiesFormSchemaType,
	SpacerCustomInstance,
	SpacerExtraAttributes,
	SpacerPropertiesSchema
} from "form-types/SpacerField";

const type: ElementsType = "SpacerField";

export const SpacerFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes: SpacerExtraAttributes
	}),
	designerBtnElement: {
		icon: LuSeparatorHorizontal,
		label: "Spacer field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,

	validate: () => true,
};

function DesignerComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as SpacerCustomInstance;
	const {height} = element.extraAttributes;
	return (
		<div className="flex flex-col gap-2 w-full items-center">
			<Label className="text-muted-foreground">Spacer field: {height}px</Label>
			<LuSeparatorHorizontal className="h-8 w-8"/>
		</div>
	);
}

function FormComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as SpacerCustomInstance;

	const {height} = element.extraAttributes;
	return <div style={{height, width: "100%"}}></div>;
}

function PropertiesComponent({elementInstance}: { elementInstance: FormElementInstance }) {
	const element = elementInstance as SpacerCustomInstance;
	const {updateElement} = useDesigner();
	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(SpacerPropertiesSchema),
		mode: "onBlur",
		defaultValues: {
			height: element.extraAttributes.height,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	function applyChanges(values: propertiesFormSchemaType) {
		const {height} = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				height,
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
					name="height"
					render={({field}) => (
						<FormItem>
							<FormLabel>Height (px): {form.watch("height")}</FormLabel>
							<FormControl className="pt-2">
								<Slider
									defaultValue={[field.value]}
									min={5}
									max={200}
									step={1}
									onValueChange={(value) => {
										field.onChange(value[0]);
									}}
								/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
