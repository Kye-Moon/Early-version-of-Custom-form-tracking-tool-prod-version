import Badge from "@/Primitives/Badge/Badge";
import React from "react";
import {Job} from "../../../../../../../packages/gql-types";
import {enumToSentenceCase} from "@/Lib/utils";
import {getBadgeVariant} from "@/Lib/badgeUtils";

interface JobDetailsCellProps {
    job: Partial<Job>;
}

export default function JobDetailsCell({job}: JobDetailsCellProps) {
    return (
        <>
            <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{job.title}</p>
                <Badge text={job.status ? enumToSentenceCase(job.status) : '-'} size={"sm"}
                       variant={job.status ? getBadgeVariant(job.status) : 'default'}/>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="truncate"> {job.customerName}</p>
            </div>
        </>
    );
}
