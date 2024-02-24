import React, {Suspense} from "react";
import {useLocalSearchParams} from "expo-router";
import Header from "../../../components/Header";
import JobRecordCell from "../../../components/JobRecordCell";
import LoadingSkeletonRows from "../../../components/Loading/SkeletonRows";

export default function Variation() {
    const {id, jobRecordTitle} = useLocalSearchParams<{ id: string, jobRecordTitle: string }>();
    return (
        <>
            <Header title={jobRecordTitle}/>
            <Suspense fallback={<LoadingSkeletonRows rows={6}/>}>
                <JobRecordCell variationId={id}/>
            </Suspense>
        </>
    )
}
