import {graphql, Attachment} from "gql-types";
import {useMutation, useSuspenseQuery} from "@apollo/client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/Primitives/Table";
import {convertFileTypeNameToReadable} from "@/Lib/utils";
import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import {EyeIcon, TrashIcon} from "lucide-react";
import toast from "react-hot-toast";

interface AttachmentsViewProps {
    referenceId: string
}


const jobAttachmentsQuery = graphql(`
    query JobAttachments($referenceId: String!) {
        attachments(referenceId: $referenceId) {
            id
            url
            name
            type
        }
    }
`)

export default function AttachmentsView({referenceId}: AttachmentsViewProps) {
    const {data} = useSuspenseQuery(jobAttachmentsQuery, {variables: {referenceId: referenceId}})

    return (
        <div className={'col-span-2 '}>
            <Table>
                <TableCaption>{"Attachments"}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.attachments.map((attachment) => (
                        <TableRow key={attachment.id}>
                            <TableCell className={'pl-4'}>{attachment.name}</TableCell>
                            <TableCell
                                className={'pl-4'}>{convertFileTypeNameToReadable(attachment.type)}</TableCell>
                            <TableCell className={'text-right'}>
                                <JobAttachmentsActionsCell attachment={attachment}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}


const deleteJobAttachmentMutation = graphql(`
    mutation DeleteJobAttachment($input: String!) {
        removeJobAttachment(id: $input)
    }
`)

interface JobAttachmentsActionsCellProps {
    attachment: Omit<Attachment, 'referenceId' | 'createdAt' | 'updatedAt' | "referenceType">
}

export const JobAttachmentsActionsCell = ({attachment}: JobAttachmentsActionsCellProps) => {
    const [deleteAttachment, {loading}] = useMutation(deleteJobAttachmentMutation, {
        variables: {input: attachment.id},
        onCompleted: () => {
            toast.success("Attachment deleted")
        },
        onError: (error) => {
            toast.error("There was an error deleting the attachment")
        },
        refetchQueries: ['JobAttachments']
    })


    const actions: Action[] = [
        {
            label: "Open",
            icon: <EyeIcon className={"h-4 text-primary/50"}/>,
            onClick: async () => {
                window.open(attachment.url, "_blank")
            },
        },
        {
            label: "Delete",
            icon: <TrashIcon className={"h-4 text-destructive"}/>,
            onClick: async () => {
                await deleteAttachment()
            },
        },
    ];
    return (
        <ActionsDropMenu actions={actions}/>
    )
}
