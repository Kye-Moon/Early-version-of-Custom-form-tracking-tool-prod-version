import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import {useNavigate} from "@tanstack/react-router";
import {
	ArchiveIcon,
	ArrowRightIcon,
	CopyIcon,
	EyeIcon,
	StarIcon,
	StopCircleIcon
} from "lucide-react";
import {Row} from "@tanstack/react-table";
import {FormTemplateTableColumn} from "@/Components/FormTemplate/FormtemplateTableColumns";
import AssignFormTemplateToJobModal from "@/Components/FormTemplate/AssignFormTemplateToJobModal";
import {useState} from "react";
import {
	duplicateFormTemplateMutation,
	findAllFormTemplateQuery,
	updateFormTemplateMutation
} from "@/Services/formTemplate";
import toast from "react-hot-toast";
import {useMutation} from "@apollo/client";

interface FormTemplatesTableActionCellProps {
	row: Row<FormTemplateTableColumn>
}

export default function FormTemplatesTableActionCell({row}: FormTemplatesTableActionCellProps) {
	const navigate = useNavigate();
	const [isAssignFormTemplateToJobModalOpen, setIsAssignFormTemplateToJobModalOpen] = useState(false);
	const isAutoAssign = row.original.autoAssign;

	const [duplicate] = useMutation(duplicateFormTemplateMutation, {
		onCompleted: () => {
			toast.dismiss()
			toast.success("Form template duplicated");
		},
		onError: (error) => {
			toast.error("Failed to duplicate form template");
		},
		awaitRefetchQueries: true,
		refetchQueries: [
			{query: findAllFormTemplateQuery}
		]
	});

	const [update] = useMutation(updateFormTemplateMutation, {
		onCompleted: () => {
			toast.dismiss()
			toast.success("Form template updated");
		},
		onError: (error) => {
			toast.error("Failed to update form template");
		},
		awaitRefetchQueries: true,
		refetchQueries: [
			{query: findAllFormTemplateQuery}
		]
	});
	const setLoadingToast = () => {
		toast.loading("Updating form template")
	}

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
		...(row.original.status === "ACTIVE" ? [
			{
				label: "Assign to job",
				icon: <EyeIcon className={"h-4 text-primary/50"}/>,
				onClick: () => {
					setIsAssignFormTemplateToJobModalOpen(true);
				},
			}
		] : []),
		...(isAutoAssign ? [
			{
				label: "Stop auto-assign",
				icon: <StopCircleIcon className={"h-4 text-primary/50"}/>,
				onClick: async () => {
					setLoadingToast();
					await update({
						variables: {
							input: {
								id: row.original.id,
								autoAssign: false
							}
						}
					});
				},
			},
		] : [
			...(row.original.status === "ACTIVE" ? [
				{
					label: "Auto-assign to jobs",
					icon: <StarIcon className={"h-4 text-primary/50"}/>,
					onClick: async () => {
						setLoadingToast();
						await update({
							variables: {
								input: {
									id: row.original.id,
									autoAssign: true
								}
							}
						});
					},
				},
			] : []),
		]),
		...(row.original.status === "ACTIVE" ? [
			{
				label: "Archive",
				icon: <ArchiveIcon className={"h-4 text-destructive/50"}/>,
				onClick: async () => {
					setLoadingToast();
					await update({
						variables: {
							input: {
								id: row.original.id,
								status: "ARCHIVED"
							}
						}
					});
				}
			}
		] : [
			{
				label: "Publish",
				icon: <ArrowRightIcon className={"h-4 text-green-500/50"}/>,
				onClick: async () => {
					setLoadingToast();
					await update({
						variables: {
							input: {
								id: row.original.id,
								status: "ACTIVE"
							}
						}
					});
				}
			}
		]),
		{
			label: "Duplicate",
			icon: <CopyIcon className={"h-4 text-primary/50"}/>,
			onClick: async () => {
				toast.loading("Duplicating form template")
				await duplicate({
					variables: {
						id: row.original.id
					}
				});
			}
		}

	];
	return (
		<>
			<ActionsDropMenu actions={FormTemplatesTableColumnActions}/>
			<AssignFormTemplateToJobModal templateId={row.original.id} formName={row.original.name}
										  isOpen={isAssignFormTemplateToJobModalOpen}
										  setOpen={setIsAssignFormTemplateToJobModalOpen}/>
		</>
	)
}
