import {ColumnDef} from "@tanstack/react-table";
import Badge from "@/Primitives/Badge/Badge";
import {enumToSentenceCase, getJobStatusBadgeVariant} from "@/Lib/utils";
import {ArrowUpDown, EditIcon, EyeIcon} from "lucide-react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/Primitives/HoverCard";
import {useNavigate} from "@tanstack/react-router";
import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";

export interface ProjectsTableColumn {
    id: string;
    title: string;
    status: string;
    customer: string;
    description: string;
    numJobs: number;
}

export const projectsTableColumns: ColumnDef<ProjectsTableColumn>[] = [
    {
        accessorKey: "title",
        header: "Name",
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <button
                    className={"flex items-center"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Job Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </button>
            );
        },
        cell: ({row}) => {
            return (
                <Badge
                    size={"sm"}
                    variant={getJobStatusBadgeVariant(row.getValue("status"))}
                    text={row.getValue("status") ? enumToSentenceCase(row.getValue("status")) : '-'}
                />
            );
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        //IF more than 3 lines, truncate and show ellipsis and show full text on hover
        cell: ({row}) => {
            return (
                <div className={'cursor-pointer'}>
                    {String(row.getValue("description")).length > 30
                        ? (<>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <div>{String(row.getValue("description")).slice(0, 30) + '...'}...
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-96 overflow-auto">
                                    <div className="flex flex-col break-words">
                                        {row.getValue("description")}
                                    </div>
                                </HoverCardContent>
                            </HoverCard>

                        </>)
                        : row.getValue("description")}

                </div>
            );
        }
    },
    {
        accessorKey: "numJobs",
        header: ({column}) => {
            return (
                <button
                    className={"flex items-center"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    # Jobs
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </button>
            );
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const navigate = useNavigate();

            const JobsTableColumnActions: Action[] = [
                {
                    label: "View",
                    icon: <EyeIcon className={"h-4 text-primary/50"}/>,
                    onClick: async () => {
                        await navigate({to: "/projects/$projectId", params: {projectId: row.original.id}});
                    },
                },
                {
                    label: "Edit",
                    icon: <EditIcon className={"h-4 text-primary/50"}/>,
                    onClick: async () => {
                        await navigate({to: "/projects/$projectId/edit", params: {projectId: row.original.id}});
                    },
                },
            ];
            return <ActionsDropMenu actions={JobsTableColumnActions}/>;

        }
    },
];
