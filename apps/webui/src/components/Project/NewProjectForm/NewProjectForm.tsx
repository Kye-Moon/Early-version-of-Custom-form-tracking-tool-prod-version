import {useForm} from "react-hook-form";
import {Form, FormField} from "@/Primitives/Form";
import {Input} from "@/Primitives/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import DropSelect from "@/Components/DropSelect/DropSelect";
import {JobStatusSelectOptions, ProjectStatus} from "@/Constants/constants";
import {Textarea} from "@/Primitives/TextArea";
import {newProjectFormSchema, NewProjectFormType} from "@/Components/Project/NewProjectForm/NewProjectFormSchema";
import {useMutation} from "@apollo/client";
import {createNewProject} from "@/Services/projectService";
import toast from "react-hot-toast";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";

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
export default function NewProjectForm({onFormSubmitComplete}: NewProjectFormProps) {

    const [createProject, {loading}] = useMutation(createNewProject, {
        onCompleted: () => {
            toast.success("Project created");
            onFormSubmitComplete?.();
        },
        onError: () => {
            toast.error("Error creating project");
            onFormSubmitComplete?.();
        },
        refetchQueries: ["FindAllProjects"],
        awaitRefetchQueries: true,
    });

    // The form hook for the NewProjectForm
    const form = useForm<NewProjectFormType>({
        resolver: zodResolver(newProjectFormSchema),
        defaultValues: {
            title: "",
            customer: "",
            description: "",
            status: ProjectStatus.UPCOMING,
        }
    });

    async function onSubmit(values: NewProjectFormType) {
        console.log(values);
        await createProject({
            variables: {
                input: {
                    ...values,
                },
            },
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
                                name="customer"
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

                <div className={"flex justify-end"}>
                    <LoadingButton label={"Submit"} loadingStatus={loading} type={"submit"}/>
                </div>
            </form>
        </Form>
    );
}
