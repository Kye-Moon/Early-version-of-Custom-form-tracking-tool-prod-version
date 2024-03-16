import {useForm} from "react-hook-form";
import {Form} from "@/Primitives/Form";

import {zodResolver} from "@hookform/resolvers/zod";
import {EditJobFormType} from "@/Pages/EditJobPage/EditJobFormSchema";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import {editProjectFormSchema, EditProjectFormType} from "@/Pages/ProjectPage/EditProject/EditProjectFormSchema";
import EditProjectDetails from "@/Pages/ProjectPage/EditProject/EditProjectDetials";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {updateProject} from "@/Services/projectService";

interface EditJobFormProps {
    projectDetails: EditProjectFormType
}

export default function EditProjectForm({projectDetails}: EditJobFormProps) {
    const form = useForm<EditProjectFormType>({
        resolver: zodResolver(editProjectFormSchema),
        defaultValues: {
            title: projectDetails.title,
            customer: projectDetails.customer || "",
            status: projectDetails.status || "",
            description: projectDetails.description || "",
        }
    });

    const [update, {loading}] = useMutation(updateProject, {
        onCompleted: async () => {
            toast.success("Project updated successfully");
        },
        onError: () => {
            toast.error("Error updating project");
        },
        refetchQueries: ["FindProject"],
        awaitRefetchQueries: true,
    });

    async function onSubmit(values: EditJobFormType) {
        if (!form.formState.isDirty) {
            toast("No changes made")
            return
        }
        await update({
            variables: {
                input: {
                    ...values,
                    id: projectDetails.id,
                },
            }
        })
        form.reset({...values})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <div className={'grid grid-cols-1 '}>
                    <div className={'col-span-1 space-y-4  pr-12'}>
                        <h1 className={'text-xl font-semibold'}>Details</h1>
                        <EditProjectDetails/>
                    </div>
                </div>
                <div className={'flex justify-end '}>
                    <LoadingButton label={"Save"} loadingStatus={loading} className={'w-40'}
                                   type="submit"/>
                </div>
            </form>
        </Form>
    )

}
