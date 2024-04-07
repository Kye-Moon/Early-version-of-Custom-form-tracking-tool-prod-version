import {Button} from "@/Primitives/Button/Button";
import {EditIcon, SaveIcon} from "lucide-react";
import {EditDetails} from "@/Pages/JobRecordPage/EditDetails";
import {ViewDetails} from "@/Pages/JobRecordPage/ViewDetails";
import React from "react";
import {VariationQuery} from "gql-types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	jobDetailsFormSchema,
	JobDetailsFormType
} from "@/Pages/JobRecordPage/JobRecordDetails/JobRecordDetailsFormSchema";
import {useMutation} from "@apollo/client";
import {updateJob} from "@/Services/jobService";
import toast from "react-hot-toast";
import {jobRecordUpdateMutation} from "@/Services/variationService";
import {processFormResponse} from "@/Services/formResponse";
import FormResponseRender from "@/Components/FormResponseRenderer/FormResponseRender";

interface JobRecordDetailsProps {
	jobRecord: VariationQuery['jobRecord']
}

export interface OnSaveDetails {
	title: string;
	customer: string;
	description: string;
	type: string;
	status: string;
	flag: string;
}

export default function JobRecordDetails({jobRecord}: JobRecordDetailsProps) {
	// const [editingDetails, setEditingDetails] = React.useState<boolean>(false)
	// const form = useForm<JobDetailsFormType>({
	// 	resolver: zodResolver(jobDetailsFormSchema),
	// 	defaultValues: {
	// 		title: jobRecord.title,
	// 		customerName: jobRecord.job.customerName ?? "",
	// 		description: jobRecord.description ?? "",
	// 		type: jobRecord.type,
	// 		status: jobRecord.status,
	// 		flag: jobRecord.flag,
	// 	}
	// });

	const processedDetails = processFormResponse({
		jobForm: jobRecord.jobForm,
		formResponse: jobRecord.formResponse
	})
	console.log('processedDetails', processedDetails)

	// const [jobUpdate, {loading: jobLoading}] = useMutation(updateJob, {
	// 	onCompleted: () => {
	// 		setEditingDetails(false)
	// 		form.reset()
	// 	},
	// 	onError: () => {
	// 		toast.error("Error updating job")
	// 	},
	// 	refetchQueries: ["Variation"],
	// 	awaitRefetchQueries: true,
	// })
	//
	// const [updateRecord, {loading}] = useMutation(jobRecordUpdateMutation, {
	// 	onCompleted: () => {
	// 		setEditingDetails(false)
	// 		form.reset()
	// 	},
	// 	onError: () => {
	// 		toast.error("Error updating job record")
	// 	},
	// 	refetchQueries: ["Variation"],
	// 	awaitRefetchQueries: true,
	// });
	// const onSaveDetails = async () => {
	// 	if (form.formState.isDirty) {
	// 		const promises = [];
	//
	// 		promises.push(updateRecord({
	// 			variables: {
	// 				input: {
	// 					id: jobRecord.id,
	// 					title: form.getValues().title,
	// 					description: form.getValues().description,
	// 				}
	// 			}
	// 		}));
	//
	// 		if (form.formState.dirtyFields.hasOwnProperty('customerName')) {
	// 			console.log('customerName', form.getValues().customerName)
	// 			promises.push(jobUpdate({
	// 				variables: {
	// 					input: {
	// 						id: jobRecord.job.id,
	// 						customerName: form.getValues().customerName,
	// 					}
	// 				}
	// 			}));
	// 		}
	//
	// 		try {
	// 			await Promise.all(promises);
	// 		} catch (error) {
	// 			toast.error("Error updating job details");
	// 		}
	// 	} else {
	// 		setEditingDetails(!editingDetails);
	// 	}
	// }

	return (
		<div className={' pb-4'}>
			<div className={'flex justify-between align-middle mr-4'}>
				<h3 className={'text-xl font-semibold'}>Details</h3>
			</div>
			<ViewDetails variation={jobRecord}/>
			<div className={'my-12 py-4 border-2 mr-6 rounded-xl  px-6'}>
				<FormResponseRender formFields={processedDetails}/>
			</div>
		</div>
	)
}
