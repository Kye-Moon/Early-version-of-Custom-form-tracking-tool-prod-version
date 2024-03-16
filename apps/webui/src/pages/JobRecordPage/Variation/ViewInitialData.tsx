import {VariationQuery} from "gql-types";
import StackedLabelAndValue from "@/Components/StackedLabelAndValue";
import React from "react";

interface ViewInitialDataProps {
    variation: VariationQuery['jobRecord']
}
export function ViewInitialData({variation} : ViewInitialDataProps) {
    return (
        <div className={'grid grid-cols-3 space-y-2 '}>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Estimated Hours'} value={variation.initialData?.hours ?? '-'}/>
            </div>
            <div className={'col-span-1 space-y-2'}>
                <StackedLabelAndValue label={'Number of crew'} value={variation.initialData?.numPeople ?? '-'}/>
            </div>
			<div className={'col-span-3 space-y-2'}>
				<StackedLabelAndValue label={'Materials'} value={variation.initialData?.materials ?? "-"}/>
			</div>
            <div className={'col-span-3 space-y-2'}>
                <StackedLabelAndValue label={'Crew'} value={variation.initialData?.who ?? "-"}/>
            </div>
            <div className={'col-span-3 space-y-2'}>
                <StackedLabelAndValue label={'Equipment'} value={variation.initialData?.equipment ?? "-"} />
            </div>
        </div>
    )
}
