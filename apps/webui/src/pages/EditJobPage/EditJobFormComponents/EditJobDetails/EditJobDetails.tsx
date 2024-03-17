import {useFormContext} from "react-hook-form";
import {EditJobFormType} from "@/Pages/EditJobPage/EditJobFormSchema";
import {FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import {Input} from "@/Primitives/Input";
import * as React from "react";
import DatePicker from "@/Components/DatePicker/DatePicker";
import DropSelect from "@/Components/DropSelect/DropSelect";
import {JobStatusSelectOptions} from "@/Constants/constants";
import {Textarea} from "@/Primitives/TextArea";
import ProjectSelect from "@/Components/ProjectSelect/ProjectSelect";
import {Suspense} from "react";
import SelectLoading from "@/Components/Loading/SelectLoading";

export default function EditJobDetails() {
	const {setValue, control} = useFormContext<EditJobFormType>()
	return (
		<div className=" grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
			<div className="sm:col-span-3">
				<FormField
					control={control}
					name="title"
					render={({field}) => (
						<FormInputWrapper label={"Title"}>
							<Input onChange={field.onChange} value={field.value}/>
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-3">
				<FormField
					control={control}
					name="customerName"
					render={({field}) => (
						<FormInputWrapper label={"Customer"}>
							<Input {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-6">
				<FormField
					control={control}
					name="projectId"
					render={({field}) => (
						<FormInputWrapper>
							<Suspense fallback={<SelectLoading/>}>
								<ProjectSelect value={field.value} setValue={field.onChange}/>
							</Suspense>
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-3">
				<FormField
					control={control}
					name="dueDate"
					render={({field}) => (
						<FormInputWrapper label={"Due date"}>
							<DatePicker
								onChange={(value) => setValue(field.name, value)}
								value={field.value}
							/>
						</FormInputWrapper>
					)}
				/>
			</div>
			<div className="sm:col-span-2">
				<FormField
					control={control}
					name="status"
					render={({field}) => (
						<FormInputWrapper label={"Status"}>
							<DropSelect
								options={JobStatusSelectOptions}
								defaultValue={field.value}
								onChange={field.onChange}
								placeholder={"Status"}
							/>
						</FormInputWrapper>
					)}
				/>
			</div>
			<span className={'sm:col-span-6'}></span>
			<div className="sm:col-span-6">
				<FormField
					control={control}
					name="description"
					render={({field}) => (
						<FormInputWrapper label={"Description / Notes"}>
							<Textarea {...field} />
						</FormInputWrapper>
					)}
				/>
			</div>
		</div>
	)
}
