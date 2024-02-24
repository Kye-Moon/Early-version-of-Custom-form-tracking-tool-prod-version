import {useForm} from "react-hook-form";
import {Form} from "@/Primitives/Form";
import {parseISO} from 'date-fns'

import {zodResolver} from "@hookform/resolvers/zod";
import {editJobFormSchema, EditJobFormType} from "@/Pages/EditJobPage/EditJobFormSchema";
import EditJobDetails
	from "@/Pages/EditJobPage/EditJobFormComponents/EditJobDetails/EditJobDetails";
import {Suspense, useEffect} from "react";
import {updateJob} from "@/Services/jobService";
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {useNavigate} from "@tanstack/react-router";
import CrewTableSection from "@/Pages/CrewPage/CrewTableSection";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import EditJobScopeItems from "@/Pages/EditJobPage/EditJobFormComponents/EditJobScopeItems";


interface EditJobFormProps {
	jobDetails: EditJobFormType
	jobCrew: string[] | undefined
}

export default function EditJobForm({jobDetails, jobCrew}: EditJobFormProps) {
	const navigate = useNavigate();

	const form = useForm<EditJobFormType>({
		resolver: zodResolver(editJobFormSchema),
		defaultValues: {
			title: jobDetails.title,
			customerName: jobDetails.customerName || "",
			dueDate: jobDetails.dueDate ? parseISO(jobDetails.dueDate) : undefined,
			status: jobDetails.status || "",
			description: jobDetails.description || "",
			crew: jobCrew || []
		}
	});

	const [update, {loading}] = useMutation(updateJob, {
		onCompleted: async () => {
			toast.success("Job updated successfully");
			// await navigate({to: '/jobs/$jobId', params: {jobId: jobDetails.id}})
		},
		onError: () => {
			toast.error("Error updating job");
		},
		refetchQueries: ["JobWithCrew"],
		awaitRefetchQueries: true,
	});

	async function onSubmit(values: EditJobFormType) {

		if (!form.formState.isDirty) {
			await navigate({to: '/jobs/$jobId', params: {jobId: jobDetails.id}})
			return
		} else {
			await update({
				variables: {
					input: {
						...values,
						id: jobDetails.id,
					},
				}
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

				<div className={'grid grid-cols-1 xl:grid-cols-2'}>
					<div className={'col-span-1 space-y-4  pr-12'}>
						<h1 className={'text-xl font-semibold'}>Details</h1>
						<EditJobDetails/>
					</div>
					<div className={'col-span-1 space-y-6 xl:pl-12'}>
						<h1 className={'text-xl font-semibold'}>Crew</h1>
						<Suspense fallback={<div>Loading...</div>}>
							<CrewTableSection showInvited={false} initialSelected={jobCrew}/>
						</Suspense>
					</div>

				</div>
				<div className={'flex justify-end pt-12'}>
					<LoadingButton label={"Save"} loadingStatus={loading} className={'w-40'}
								   type="submit"/>
				</div>
			</form>
		</Form>
	)
}
