import {FileDrop} from "react-file-drop";
import {ALLOWED_FILE_TYPES} from "@/Lib/utils";
import toast from "react-hot-toast";
import {XIcon} from "lucide-react";

interface AttachmentUploadProps {
	files: File[];
	setFiles: (files: File[]) => void;
}

export default function ImageDropWithPreview({files, setFiles}: AttachmentUploadProps) {
	const handleDrop = (newFiles: FileList | null) => {
		if (!newFiles) return;
		//filter out files that already exist or where the type is not allowed
		const filteredFiles = Array.from(newFiles)
			.filter((file) => !files.some((f) => f.name === file.name))
		if (filteredFiles.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
			toast.error("File type not allowed")
			return;
		} else {
			setFiles([...files, ...filteredFiles]);
		}
	}

	return (
		<div>
			<div className={'w-1/2'}>
				<FileDrop
					onDrop={(files, event) => handleDrop(files)}
				>
					<div
						className={'h-40 border-2 border-gray-200 border-dashed rounded-lg flex place-items-center place-content-center'}>
						<p className={'text-gray-400'}>Drop images here</p>
					</div>
				</FileDrop>
			</div>
			{/**File preview */}
			<div className={'flex flex-wrap gap-2 my-8'}>
				{files.map((file, index) => (
					<div key={index}
						 className="flex flex-col w-28 gap-2 bg-white rounded-lg shadow p-4 relative">
						<img src={URL.createObjectURL(file)} alt={file.name}
							 className="h-20 w-20  object-cover rounded-md"/>
						<p className="text-sm font-medium truncate">{file.name}</p>
						<button className="absolute top-0 right-0 "
								onClick={() => setFiles(files.filter((f) => f.name !== file.name))}>
							<XIcon color={'red'}
								   className={'h-6 font-semibold bg-white rounded-2xl'}/></button>
					</div>
				))}
			</div>
		</div>
	);
}
