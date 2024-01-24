import {FileDrop} from "react-file-drop";
import {Suspense, useState} from "react";
import {Button} from "@/Primitives/Button/Button";
import {XIcon} from "lucide-react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {preSignedUrlQuery, uploadAttachments, uploadImages} from "@/Lib/s3";
import toast from "react-hot-toast";
import {graphql} from "gql-types";
import {
	AttachmentsInput
} from "server/dist/src/modules/job-attachment/dto/create-job-attachment.input";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import {ALLOWED_FILE_TYPES} from "@/Lib/utils";


const createAttachmentMutation = graphql(`
	mutation CreateJobAttachments($input: CreateJobAttachmentsInput !) {
		createJobAttachments(createJobAttachmentInput: $input) {
			id
			jobId
			url
		}
	}
`)

interface AttachmentUploadProps {
	jobId: string
}

export default function AttachmentUpload({jobId}: AttachmentUploadProps) {
	const [getPresignedUrl] = useLazyQuery(preSignedUrlQuery)
	const [files, setFiles] = useState<File[]>([]);
	const [createAttachments, {loading}] = useMutation(createAttachmentMutation,{
		onCompleted: () => {
			toast.success("Attachments uploaded")
			setFiles([])
		},
		onError: (error) => {
			toast.error("There was an error uploading attachments")
		},
		refetchQueries: ['JobAttachments'],
		awaitRefetchQueries: true
	})

	const handleDrop = (newFiles: FileList | null) => {
		if (!newFiles) return;
		//filter out files that already exist or where the type is not allowed
		const filteredFiles = Array.from(newFiles)
			.filter((file) => !files.some((f) => f.name === file.name))
		if (filteredFiles.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
			toast.error("File type not allowed")
		} else {
			setFiles([...files, ...filteredFiles]);
		}
	}

	const handleUpload = async () => {
		if (files.length === 0) return;
		const uploaded = await uploadAttachments({
				files: files,
				getPresignedUrl: getPresignedUrl,
				key: `${jobId}/attachments`,
			}
		)
		await createAttachments({
			variables: {
				input: {
					jobId: jobId,
					attachments: [...uploaded]
				}
			}
		})
	}


	return (
		<div>
			<h1 className={'text-xl font-semibold'}>Attachments</h1>
			<h3 className={'text-sm pb-4 text-gray-400'}>Add or remove attachments from
				this job</h3>
			<FileDrop
				onDrop={(files, event) => handleDrop(files)}
			>
				<div
					className={'h-40 border-2 border-gray-200 border-dashed rounded-lg flex place-items-center place-content-center'}>
					<p className={'text-gray-400'}>Drop files here</p>
				</div>
			</FileDrop>
			{files.map((file) => (
				<div key={file.name} className={'flex space-x-2 py-1'}>
					<div>{file.name}</div>
					<button onClick={() => setFiles(files.filter((f) => f.name !== file.name))}>
						<XIcon color={'red'} className={'h-4'}/></button>
				</div>
			))}
			<div className={'flex justify-end pt-6'}>
				<LoadingButton label={"Upload"} loadingStatus={loading} onClick={handleUpload}
							   variant={'default'}/>
			</div>
		</div>
	)
}
