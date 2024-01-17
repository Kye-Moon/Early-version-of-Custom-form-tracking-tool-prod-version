import {Button} from "@/Primitives/Button/Button";
import {EditIcon, SaveIcon} from "lucide-react";
import {EditDetails} from "@/Pages/JobRecordPage.tsx/EditDetails";
import {ViewDetails} from "@/Pages/JobRecordPage.tsx/ViewDetails";
import React from "react";
import {VariationQuery} from "gql-types";
import {useForm} from "react-hook-form";
import {newJobFormSchema, NewJobFormType} from "@/Components/Jobs/NewJobDialog/NewJobForm/NewJobFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {JobStatus} from "@/Constants/constants";
import {
    jobDetailsFormSchema,
    JobDetailsFormType
} from "@/Pages/JobRecordPage.tsx/JobRecordDetails/JobRecordDetailsFormSchema";
import {useMutation} from "@apollo/client";
import {createNewJob, updateJob} from "@/Services/jobService";
import toast from "react-hot-toast";
import {jobRecordUpdateMutation} from "@/Services/variationService";

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
    const [editingDetails, setEditingDetails] = React.useState<boolean>(false)
    const form = useForm<JobDetailsFormType>({
        resolver: zodResolver(jobDetailsFormSchema),
        defaultValues: {
            title: jobRecord.title,
            customerName: jobRecord.job.customerName ?? "",
            description: jobRecord.description ?? "",
            type: jobRecord.type,
            status: jobRecord.status,
            flag: jobRecord.flag,
        }
    });

    const [jobUpdate, {loading: jobLoading}] = useMutation(updateJob, {
        onCompleted: () => {
            setEditingDetails(false)
            form.reset()
        },
        onError: () => {
            toast.error("Error updating job")
        },
        refetchQueries: ["Variation"],
        awaitRefetchQueries: true,
    })

    const [updateRecord, {loading}] = useMutation(jobRecordUpdateMutation, {
        onCompleted: () => {
            setEditingDetails(false)
            form.reset()
        },
        onError: () => {
            toast.error("Error updating job record")
        },
        refetchQueries: ["Variation"],
        awaitRefetchQueries: true,
    });
    const onSaveDetails = async () => {
        if (form.formState.isDirty) {
            const promises = [];

            promises.push(updateRecord({
                variables: {
                    input: {
                        id: jobRecord.id,
                        title: form.getValues().title,
                        description: form.getValues().description,
                        type: form.getValues().type,
                        flag: form.getValues().flag,
                        status: form.getValues().status,
                    }
                }
            }));

            if (form.formState.dirtyFields.hasOwnProperty('customerName')) {
                promises.push(jobUpdate({
                    variables: {
                        input: {
                            id: jobRecord.job.id,
                            customerName: form.getValues().customerName,
                        }
                    }
                }));
            }

            try {
                await Promise.all(promises);
            } catch (error) {
                toast.error("Error updating job details");
            }
        } else {
            setEditingDetails(!editingDetails);
        }
    }

    return (
        <div className={' pb-4'}>
            <div className={'flex justify-between align-middle mr-4'}>
                <h3 className={'text-xl font-semibold'}>Details</h3>
                <Button onClick={() => onSaveDetails()} size={'sm'}
                        variant={'outline'}>
                    {editingDetails ? <SaveIcon size={20}/> : <EditIcon size={20}/>}
                </Button>
            </div>
            {editingDetails
                ? <EditDetails form={form} onSubmit={onSaveDetails} jobRecord={jobRecord}/>
                : <ViewDetails variation={jobRecord}/>}
        </div>
    )
}
