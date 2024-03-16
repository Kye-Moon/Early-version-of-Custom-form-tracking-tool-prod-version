import StackedLabelAndValue from "@/Components/StackedLabelAndValue";
import React from "react";
import {variationResourceSummary} from "@/Services/variationResourceService";
import {useSuspenseQuery} from "@apollo/client";

export const ViewSummary = ({variationId}:{variationId: string}) => {
    const {data} = useSuspenseQuery(variationResourceSummary, {variables: {variationId: variationId}})

    return (
        <div className={'grid grid-cols-4'}>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Labour Total'} value={`$${data.variationResourceSummary.labourTotal}`}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Material Total'} value={`$${data.variationResourceSummary.materialTotal}`}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Equipment Total'} value={`$${data.variationResourceSummary.labourTotal}`}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Other'} value={`$${data.variationResourceSummary.otherTotal}`}/>
            </div>
            <div className={'col-span-3 text-lg font-bold space-y-2'}>
                <StackedLabelAndValue label={'Total'} value={`$${data.variationResourceSummary.total}`}/>
            </div>
        </div>
    )
}
