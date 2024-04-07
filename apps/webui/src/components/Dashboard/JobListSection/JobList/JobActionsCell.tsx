import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import {EditIcon, EyeIcon} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";


interface JobActionsCellProps {
	actions?: Action[];
	jobID: string;
}

export default function JobActionsCell({actions, jobID}: JobActionsCellProps) {
	const navigate = useNavigate();
	const defaultActions: Action[] = [
		{
			label: "View",
			icon: <EyeIcon className={"h-4 text-primary/50"}/>,
			onClick: async () => {
				await navigate({to: "/jobs/$jobId", params: {jobId: jobID}});
			},
		},
		{
			label: "Edit",
			icon: <EditIcon className={"h-4 text-primary/50"}/>,
			onClick: async () => {
				await navigate({to: "/jobs/$jobId/edit", params: {jobId: jobID}});
			},
		},
	];
	return (
		<>
			<ActionsDropMenu actions={actions ? actions : defaultActions}/>
		</>
	);
}
