import {useForm} from "react-hook-form";
import {Form, FormField} from "@/Primitives/Form";
import {Input} from "@/Primitives/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {Suspense, useState} from "react";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import DropSelect from "@/Components/DropSelect/DropSelect";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import {newJobFormSchema, NewJobFormType,} from "@/Components/Jobs/NewJobForm/NewJobFormSchema";
import {useMutation} from "@apollo/client";
import {createNewJob} from "@/Services/jobService";
import toast from "react-hot-toast";
import {JobStatus, JobStatusSelectOptions} from "@/Constants/constants";
import {Textarea} from "@/Primitives/TextArea";
import CrewTableSection from "@/Pages/CrewPage/CrewTableSection";
import ProjectSelect from "@/Components/ProjectSelect/ProjectSelect";
import {Checkbox} from "@/Primitives/Checkbox";
import SelectLoading from "@/Components/Loading/SelectLoading";

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
export default function NewJobForm({onFormSubmitComplete}: NewProjectFormProps) {
    const [createAnother, setCreateAnother] = useState(false)

    const [createJob, {loading}] = useMutation(createNewJob, {
        onCompleted: () => {
            toast.success("Job created");
        },
        onError: () => {
            toast.error("Error creating job");
        },
        refetchQueries: ["JobsTableSearchJobs"],
        awaitRefetchQueries: true,
    });

    // The form hook for the NewRecordTemplateForm
    const form = useForm<NewJobFormType>({
        resolver: zodResolver(newJobFormSchema),
        defaultValues: {
            status: JobStatus.UPCOMING,
        }
    });

    async function onSubmit(values: NewJobFormType) {
        await createJob({
            variables: {
                input: {
                    ...values,
                },
            },
        });
        if (!createAnother) {
            if (onFormSubmitComplete) {
                onFormSubmitComplete();
            }
        } else {
            // reset the form and set the job id to the current job id
            form.reset({
                projectId: form.watch('projectId'),
                customerName: form.watch('customerName'),
                title: '',
                description: '',
                crew: [],
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto">
                <div className={'grid grid-cols-2 gap-x-12 px-1'}>
                    <div className={'col-span-1'}>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
                            <div className="sm:col-span-3">
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
                                    name="customerName"
                                    render={({field}) => (
                                        <FormInputWrapper label={"Customer"}>
                                            <Input {...field} />
                                        </FormInputWrapper>
                                    )}
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <FormField
                                    control={form.control}
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
                            <div className="sm:col-span-3">
                                <FormField
                                    control={form.control}
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
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormInputWrapper label={"Description / Notes"}>
                                            <Textarea {...field} />
                                        </FormInputWrapper>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="sm:col-span-3">
                            <FormField
                                control={form.control}
                                name="crew"
                                render={({field}) => (
                                    <FormInputWrapper label={"Select Crew"}>
                                        <Suspense>
                                            <CrewTableSection
                                                showInvited={false}
                                                showSelect={true}
                                                tableCaption={"Available Crew"}
                                            />
                                        </Suspense>
                                    </FormInputWrapper>
                                )}
                            />
                        </div>
                    </div>
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

                    <LoadingButton label={"Submit"} loadingStatus={loading}
                                   type={"submit"}/>
                </div>
            </form>
        </Form>
    );
}
