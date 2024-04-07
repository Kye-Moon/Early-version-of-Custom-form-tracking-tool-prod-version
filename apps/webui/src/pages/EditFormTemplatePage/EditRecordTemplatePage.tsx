import {useParams} from "@tanstack/react-router";
import EditRecordTemplateCell from "@/Pages/EditFormTemplatePage/EditRecordTemplateCell";
import React, {Suspense} from "react";
import PageContentSection from "@/Components/PageContentSection";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {
	getEditRecordTemplatesPageBreadCrumb,
	getViewProjectPageBreadCrumb
} from "@/Constants/breadcrumbs";

export default function EditRecordTemplatePage() {
	const params = useParams({from: "/layout/record-templates/$recordTemplateId/edit"});

	return (
		<div>
			<BreadCrumb
				pages={getEditRecordTemplatesPageBreadCrumb({templateId: params.recordTemplateId})}/>
			<PageContentSection>
				<Suspense fallback={<div>Loading...</div>}>
					<EditRecordTemplateCell templateId={params.recordTemplateId}/>
				</Suspense>
			</PageContentSection>
		</div>
	)
}
