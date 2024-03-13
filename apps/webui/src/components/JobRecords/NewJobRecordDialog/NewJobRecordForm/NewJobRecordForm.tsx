import {useForm} from "react-hook-form";
import {Form, FormField} from "@/Primitives/Form";
import {Input} from "@/Primitives/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {Suspense, useState} from "react";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import DropSelect from "@/Components/DropSelect/DropSelect";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import {useLazyQuery, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {jobRecordTypeSelectOptions, riskLevelSelectOptions} from "@/Constants/constants";
import {Textarea} from "@/Primitives/TextArea";
import JobSelect from "@/Components/JobSelect/JobSelect";
import {
	newJobRecordFormSchema,
	NewJobRecordFormType
} from "@/Components/JobRecords/NewJobRecordDialog/NewJobRecordForm/NewJobRecordFormSchema";
import JobScopeItemSelect from "@/Components/JobScopeItemSelect/JobScopeItemSelect";
import VariationForm
	from "@/Components/JobRecords/NewJobRecordDialog/NewJobRecordForm/VariationForm/VariationForm";
import ImageDropWithPreview from "@/Components/ImageUpload/ImageDropWithPreview";
import {createMutation, updateMutation} from "@/Services/jobRecordService";
import {stripEmptyValues} from "@/Lib/utils";
import {preSignedUrlQuery,} from "@/Lib/s3";
import {uploadImages} from "@/Lib/s3";
import SelectLoading from "@/Components/Loading/SelectLoading";
import {Checkbox} from "@/Primitives/Checkbox";

/**
 * Props for the NewProjectForm component
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
export default function NewJobRecordForm({onFormSubmitComplete}: NewProjectFormProps) {
	const [files, setFiles] = useState<File[]>([]);
	const [getPresignedUrl] = useLazyQuery(preSignedUrlQuery)
	const [createAnother, setCreateAnother] = useState(false)

	const [saveDetails, {loading}] = useMutation(createMutation, {
		onError: (error) => toast.error("There was an error saving the job record"),
		onCompleted: (data) => toast.success("Job record saved"),
		refetchQueries: ['VariationTableSearchVariations'],
		awaitRefetchQueries: true
	})

	const [updateDetails, {loading: updateLoading}] = useMutation(updateMutation, {
		onError: (error) => toast.error("There was an error saving images to the job record"),
	})

	// The form hook for the NewProjectForm
	const form = useForm<NewJobRecordFormType>({
		resolver: zodResolver(newJobRecordFormSchema),
		defaultValues: {
			jobId: "",
			scopeRef: "",
			title: "",
			description: "",
			flag: '',
			type: "",
			hours: '',
			numPeople: '',
			who: '',
			materials: '',
			equipment: '',
		}
	});

	async function onSubmit(values: NewJobRecordFormType) {
		const strippedData = stripEmptyValues(values)
		const jobRecord = await saveDetails({
			variables: {
				input: {
					...strippedData,
				}
			}
		})
		if (!jobRecord.data?.createJobRecord) {
			return;
		}
		if (files.length > 0) {
			const uploaded = await uploadImages({
					files: files,
					getPresignedUrl: getPresignedUrl,
					key: `${jobRecord.data.createJobRecord.id}`,
				}
			)
			await updateDetails({
				variables: {
					input: {
						id: jobRecord.data.createJobRecord.id,
						imageUrls: uploaded
					}
				}
			})
		}
		if (!createAnother) {
			if (onFormSubmitComplete) {
				onFormSubmitComplete();
			}
			form.reset()
		}else {
			// reset the form and set the job id to the current job id
			form.reset({
				jobId: form.watch('jobId')
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto">
				<div className="mt-4 mx-1 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2">
					<div className="sm:col-span-1">
						<FormField
							control={form.control}
							name="jobId"
							render={({field}) => (
								<FormInputWrapper label={""}>
									<Suspense fallback={<SelectLoading/>}>
										<JobSelect
											setValue={field.onChange}
											value={field.value}
										/>
									</Suspense>
								</FormInputWrapper>
							)}
						/>
					</div>
					<div className="sm:col-span-1">
						<FormField
							control={form.control}
							name="scopeItemId"
							render={({field}) => (
								<FormInputWrapper label={""}>
									<Suspense fallback={<SelectLoading/>}>
										<JobScopeItemSelect
											setValue={field.onChange}
											value={field.value}
											jobId={form.watch('jobId')}
										/>
									</Suspense>
								</FormInputWrapper>
							)}
						/>
					</div>
					<div className="sm:col-span-1">
						<FormField
							control={form.control}
							name="type"
							render={({field}) => (
								<FormInputWrapper label={"Record Type"}>
									<DropSelect
										options={jobRecordTypeSelectOptions}
										defaultValue={field.value}
										onChange={field.onChange}
										placeholder={"Record Type"}
									/>
								</FormInputWrapper>
							)}
						/>
					</div>
					<div className="sm:col-span-1"></div>
					<div className="sm:col-span-1">
						<FormField
							control={form.control}
							name="title"
							render={({field}) => (
								<FormInputWrapper label={"Title"}>
									<Input {...field} />
								</FormInputWrapper>
							)}
						/>
					</div>
					<div className="sm:col-span-2">
						<FormField
							control={form.control}
							name="description"
							render={({field}) => (
								<FormInputWrapper label={"Description/Notes"}>
									<Textarea {...field} />
								</FormInputWrapper>
							)}
						/>
					</div>
					{form.watch('type') === 'VARIATION' &&
						<div className="sm:col-span-2">
							<div className="sm:col-span-3">
								<VariationForm form={form}/>
							</div>
						</div>}
					{form.watch('type') === 'NOTE' && <div className="sm:col-span-1">
					</div>}
					{(form.watch('type') === 'QA' || form.watch('type') === 'SAFETY') &&
						<div className="sm:col-span-2">
							<div className="sm:col-span-1">
								<FormField
									control={form.control}
									name="flag"
									render={({field}) => (
										<FormInputWrapper label={"Risk Level"}>
											<DropSelect
												options={riskLevelSelectOptions}
												defaultValue={field.value}
												onChange={field.onChange}
												placeholder={"Risk Level"}
											/>
										</FormInputWrapper>
									)}
								/>
							</div>
						</div>
					}
					{form.watch('type') && <div className="sm:col-span-2">
						<ImageDropWithPreview files={files} setFiles={setFiles}/>
					</div>
					}
				</div>
				<div className={"flex justify-end space-x-8"}>
					<div className={"flex items-center space-x-2"}>
						<div className="flex items-center space-x-2">
							<label
								htmlFor="another"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Create another
							</label>
							<Checkbox id="another" checked={createAnother}
									  onCheckedChange={() => setCreateAnother(!createAnother)}/>
						</div>
					</div>

					<LoadingButton label={"Submit"} loadingStatus={loading || updateLoading}
								   type={"submit"}/>
				</div>
			</form>
		</Form>
	)
		;
}
