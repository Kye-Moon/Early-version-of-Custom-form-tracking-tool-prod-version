import {UseFormReturn} from "react-hook-form";
import {FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import * as React from "react";
import {Input} from "@/Primitives/Input";

export interface JobRecordSubFormProps {
	form: UseFormReturn<any, any, undefined>;
}

export default function VariationForm({form}: JobRecordSubFormProps) {
	return (
		<div className="grid grid-cols-3 gap-2">
			<div className="sm:col-span-1">
				<FormField
					control={form.control}
					name="hours"
					render={({field}) => (
						<FormInputWrapper label={"Est. hours"}>
							<Input {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-1">
				<FormField
					control={form.control}
					name="numPeople"
					render={({field}) => (
						<FormInputWrapper label={"Number of people"}>
							<Input {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-2">
				<FormField
					control={form.control}
					name="who"
					render={({field}) => (
						<FormInputWrapper label={"Who"}
										  description={"Optionally add who it, or information regarding chargeable rates."}>
							<Input {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-2">
				<FormField
					control={form.control}
					name="materials"
					render={({field}) => (
						<FormInputWrapper label={"Materials"}
										  description={"Optionally add any materials used."}>
							<Input {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-2">
				<FormField
					control={form.control}
					name="equipment"
					render={({field}) => (
						<FormInputWrapper label={"Equipment"}
										  description={"Optionally add any equipment used."}>
							<Input {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
		</div>
	);
}
