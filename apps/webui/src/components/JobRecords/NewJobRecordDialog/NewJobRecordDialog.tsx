import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Primitives/Dialog";
import {buttonVariants} from "@/Primitives/Button/Button";

import {cn} from "@/Lib/utils";
import {PlusIcon} from "lucide-react";
import React from "react";
import NewJobRecordForm
	from "@/Components/JobRecords/NewJobRecordDialog/NewJobRecordForm/NewJobRecordForm";

export default function NewJobRecordDialog() {
	const [open, setOpen] = React.useState(false);
	const onFormSubmitComplete = () => {
		setOpen(false);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={cn(buttonVariants({variant: "default", size: "default"}))}>
				<PlusIcon className={"mr-2 h-4 w-4 shrink-0"}/>
				New Record
			</DialogTrigger>
			<DialogContent className={"max-w-4xl max-h-[80vh] overflow-y-auto"}>
				<DialogHeader>
					<DialogTitle>New Record</DialogTitle>
				</DialogHeader>
				<NewJobRecordForm onFormSubmitComplete={onFormSubmitComplete}/>
			</DialogContent>
		</Dialog>
	);
}
