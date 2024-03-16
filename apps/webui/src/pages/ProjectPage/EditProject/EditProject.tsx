import {useParams} from "@tanstack/react-router";
import {useQuery} from "@apollo/client";
import React, {Suspense, useRef, useState} from "react";
import {AttachmentUpload, AttachmentUploadHandles} from "@/Pages/EditJobPage/AttachmentUpload";
import {findProject} from "@/Services/projectService";
import PageHeadingWithMetaAndActions from "@/Components/PageHeadingWithMetaAndActions/PageHeadingWithMetaAndActions";
import PageContentSection from "@/Components/PageContentSection";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import AttachmentsView from "@/Pages/EditJobPage/Attachments/AttachmentsView";
import EditProjectForm from "@/Pages/ProjectPage/EditProject/EditProjectForm";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {getEditProjectPageBreadCrumb} from "@/Constants/breadcrumbs";

export default function EditProject() {
    const params = useParams({from: "/layout/projects/$projectId"});
    const {data, loading} = useQuery(findProject, {variables: {id: params.projectId}});
    const attachmentUploadRef = useRef<AttachmentUploadHandles>(null);
    const [uploading, setUploading] = useState(false);

    const triggerUpload = async () => {
        if (attachmentUploadRef.current) {
            setUploading(true);
            await attachmentUploadRef.current.handleUpload();
            setUploading(false);
        }
    };

    return (
        <div>
            <PageHeadingWithMetaAndActions pageHeading={'Edit ' + data?.project.title || ""}/>
            <BreadCrumb pages={getEditProjectPageBreadCrumb({projectId: data?.project.id})}/>
            <PageContentSection>
                {loading ? (<></>) : (<EditProjectForm projectDetails={data?.project}/>)}
            </PageContentSection>
            <PageContentSection>
                <div className={'space-y-12'}>
                    <div className={'col-span-2 '}>
                        <AttachmentUpload ref={attachmentUploadRef} referenceType={"JOB"}
                                          referenceId={params.projectId}/>
                        <div className={'flex justify-end pt-6'}>
                            <LoadingButton label={"Upload"} loadingStatus={uploading} onClick={triggerUpload}
                                           variant={'default'}/>
                        </div>
                    </div>
                    <div>
                        <Suspense>
                            <AttachmentsView referenceId={params.projectId}/>
                        </Suspense>
                    </div>
                </div>
            </PageContentSection>
        </div>
    );
}
