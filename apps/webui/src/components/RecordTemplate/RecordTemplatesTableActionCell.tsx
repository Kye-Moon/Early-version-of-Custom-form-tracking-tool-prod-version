import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import {useNavigate} from "@tanstack/react-router";
import {EditIcon, EyeIcon, FolderIcon, TrashIcon} from "lucide-react";
import {Row} from "@tanstack/react-table";
import {FormTemplateTableColumn} from "@/Components/RecordTemplate/FormtemplateTableColumns";
import AssignFormTemplateToJobModal from "@/Components/RecordTemplate/AssignFormTemplateToJobModal";
import {useState} from "react";

interface FormTemplatesTableActionCellProps {
	row: Row<FormTemplateTableColumn>
}

export default function FormTemplatesTableActionCell({row}: FormTemplatesTableActionCellProps) {
	const navigate = useNavigate();
	const [isAssignFormTemplateToJobModalOpen, setIsAssignFormTemplateToJobModalOpen] = useState(false);

	const FormTemplatesTableColumnActions: Action[] = [
		{
			label: "View",
			icon: <EyeIcon className={"h-4 text-primary/50"}/>,
			onClick: async () => {
				await navigate({
					to: "/record-templates/$recordTemplateId/edit",
					params: {recordTemplateId: row.original.id}
				});
			},
		},
		{
			label: "Assign to job",
			icon: <EyeIcon className={"h-4 text-primary/50"}/>,
			onClick:  () => {
				setIsAssignFormTemplateToJobModalOpen(true);
			},
		},
	];
	return (
		<>
			<ActionsDropMenu actions={FormTemplatesTableColumnActions}/>
			<AssignFormTemplateToJobModal templateId={row.original.id} formName={row.original.name} isOpen={isAssignFormTemplateToJobModalOpen} setOpen={setIsAssignFormTemplateToJobModalOpen}/>
		</>
	)
}
