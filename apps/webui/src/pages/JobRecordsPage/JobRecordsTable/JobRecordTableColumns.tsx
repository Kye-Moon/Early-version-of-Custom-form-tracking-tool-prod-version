import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, EyeIcon} from "lucide-react";
import ActionsDropMenu, {Action} from "@/Components/ActionsDropMenu/ActionsDropMenu";
import moment from "moment";
import {useNavigate} from "@tanstack/react-router";
import Badge from "@/Primitives/Badge/Badge";
import {
    enumToSentenceCase,
    getJobRecordFlagBadgeVariant,
    getJobRecordStatusBadgeVariant,
    getJobRecordTypeBadgeVariant
} from "@/Lib/utils";

export interface JobRecordTableColumn {
    id: string;
    jobName?: string | null;
    title: string;
    type?: string | null;
    submittedBy: string;
    createdAt: string;
}

export const jobRecordTableColumns: ColumnDef<JobRecordTableColumn>[] = [
    {
        accessorKey: "title",
        header: "Name",
    },
    {
        accessorKey: "jobName",
        header: "Job",
    },
    {
        accessorKey: "type",
        header: ({column}) => {
            return (
                <button
                    className={"flex items-center"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </button>
            );
        },
        cell: ({row}) => {
            return <Badge text={row.getValue("type") ? row.getValue("type") : "-"} size={'sm'}
                          variant={getJobRecordTypeBadgeVariant(row.getValue("type"))}/>

        }
    },
    {
        accessorKey: "submittedBy",
        header: "Submitted by",
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <button
                    className={"flex items-center"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </button>
            );
        },
        cell: ({row}) => {
            return moment(row.getValue("createdAt")).isValid()
                ? moment(row.getValue("createdAt")).toDate().toDateString()
                : "-";
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const navigate = useNavigate();
            const JobsTableColumnActions: Action[] = [
                {
                    label: "View / Edit ",
                    icon: <EyeIcon className={"h-4 text-primary/50"}/>,
                    onClick: async () => {
                        await navigate({
                            to: '/job-records/$jobRecordId/edit',
                            params: {jobRecordId: row.original.id}
                        })
                    },
                },
            ];
            return <ActionsDropMenu actions={JobsTableColumnActions}/>;
        },
    },
];

