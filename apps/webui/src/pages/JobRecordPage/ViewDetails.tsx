import StackedLabelAndValue from "@/Components/StackedLabelAndValue";
import React from "react";
import {VariationQuery} from "gql-types";
import {
    enumToSentenceCase,
    getJobRecordFlagBadgeVariant,
    getJobRecordStatusBadgeVariant,
    getJobRecordTypeBadgeVariant
} from "@/Lib/utils";
import Badge from "@/Primitives/Badge/Badge";
import {format} from "date-fns";

interface ViewDetailsProps {
    variation: VariationQuery['jobRecord']
}

export function ViewDetails({variation}: ViewDetailsProps) {
    return (
        <div className={'grid grid-cols-3 space-y-2 '}>
            <div className={'col-span-2 space-y-2'}>
                <StackedLabelAndValue label={'Title'} value={variation.title}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Customer'} value={variation.job.customerName}/>
            </div>
            <div className={'col-span-2 space-y-2'}>
                <StackedLabelAndValue label={'Submitted At'} value={format(new Date(variation.createdAt)," hh:mm a dd, MMM, yyyy")}/>
            </div>
			<div className={'col-span-1 space-y-2'}>
				<StackedLabelAndValue label={'Submitted By'} value={variation.submittedBy.name}/>
			</div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Status'}
                                      value={<Badge text={variation.status ? enumToSentenceCase(variation.status) : "-"}
                                                    size={'sm'}
                                                    variant={getJobRecordStatusBadgeVariant(variation.status)}/>}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Record Type'}
                                      value={<Badge text={variation.type ? enumToSentenceCase(variation.type) : "-"}
                                                    size={'sm'}
                                                    variant={getJobRecordTypeBadgeVariant(variation.type)}/>}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Flag'}
                                      value={<Badge text={variation.flag ? enumToSentenceCase(variation.flag) : "-"}
                                                    size={'sm'}
                                                    variant={getJobRecordFlagBadgeVariant(variation.flag)}/>}/>
            </div>
            <div className={'col-span-3 space-y-2'}>
                <StackedLabelAndValue label={'Description'} value={variation.description}/>
            </div>
        </div>
    )
}
