import {useForm} from "react-hook-form";
import {Form, FormField} from "@/Primitives/Form";
import {Input} from "@/Primitives/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import DropSelect from "@/Components/DropSelect/DropSelect";
import {
	JobStatusSelectOptions,
	newFormTemplateCategorySelectOptions,
	ProjectStatus
} from "@/Constants/constants";
import {Textarea} from "@/Primitives/TextArea";
import {
	NewProjectFormType
} from "@/Components/Project/NewProjectForm/NewProjectFormSchema";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import {
	newRecordTemplateFormSchema, NewRecordTemplateFormType
} from "@/Components/RecordTemplate/NewRecordTemplateForm/NewRecordTemplateFormSchema";
import {createFormTemplateMutation} from "@/Services/formTemplate";
import {useNavigate, useRouter} from "@tanstack/react-router";

/**
 * Props for the NewRecordTemplateForm component
 */
interface NewProjectFormProps {
	/**
	 * Function to call when the form is submitted, used to close the modal and perform any other actions
	 */
	onFormSubmitComplete?: () => void;
}

/**
 * A form component that allows the user to create a new project
 * @param onFormSubmitComplete
 * @constructor
 */
export default function NewRecordTemplateForm({onFormSubmitComplete}: NewProjectFormProps) {
	const navigate = useNavigate();

	const [createTemplate, {loading}] = useMutation(createFormTemplateMutation, {
		onCompleted: async (data) => {
			toast.success("Template created");
			await navigate({
				to: `/record-templates/$recordTemplateId/edit`,
				params: {recordTemplateId: data.createFormTemplate.id}
			});
			onFormSubmitComplete?.();
		},
		onError: () => {
			toast.error("Error creating Template");
			onFormSubmitComplete?.();
		},
	});

	// The form hook for the NewRecordTemplateForm
	const form = useForm<NewRecordTemplateFormType>({
		resolver: zodResolver(newRecordTemplateFormSchema),
		defaultValues: {
			name: "",
			description: "",
			category: ""
		}
	});

	async function onSubmit(values: NewProjectFormType) {
		console.log(values);
		await createTemplate({
			variables: {
				input: {
					name: values.name,
					description: values.description,
					category: values.category
				}
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto px-2">
				<div className={'col-span-1'}>
					<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
						<div className="sm:col-span-3">
							<FormField
								control={form.control}
								name="name"
								render={({field}) => (
									<FormInputWrapper label={"Title"}>
										<Input {...field} />
									</FormInputWrapper>
								)}
							/>
						</div>
						<div className="sm:col-span-1">
							<FormField
								control={form.control}
								name="category"
								render={({field}) => (
									<FormInputWrapper label={"Category"}>
										<DropSelect
											options={newFormTemplateCategorySelectOptions}
											defaultValue={field.value}
											onChange={field.onChange}
											placeholder={"Status"}
										/>
									</FormInputWrapper>
								)}
							/>
						</div>
						<div className="sm:col-span-3">
							<FormField
								control={form.control}
								name="description"
								render={({field}) => (
									<FormInputWrapper label={"Description"}>
										<Textarea {...field} />
									</FormInputWrapper>
								)}
							/>
						</div>
					</div>
				</div>

				<div className={"flex justify-end"}>
					<LoadingButton label={"Create"} loadingStatus={loading} type={"submit"}/>
				</div>
			</form>
		</Form>
	);
}
