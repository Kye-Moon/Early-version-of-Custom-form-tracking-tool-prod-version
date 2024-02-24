import {useLocalSearchParams} from "expo-router";
import JobCell from "../../../components/JobCell/JobCell";
import React, {Suspense} from "react";
import Header from "../../../components/Header";
import LoadingSkeletonRows from "../../../components/Loading/SkeletonRows";

export default function Job() {
    const {id, jobTitle} = useLocalSearchParams<{ id: string, jobTitle: string }>();
    return (
        <>
            <Header title={"Job Details"}/>
            <Suspense fallback={<LoadingSkeletonRows rows={6}/>}>
                <JobCell jobId={id}/>
            </Suspense>
        </>

    )
}