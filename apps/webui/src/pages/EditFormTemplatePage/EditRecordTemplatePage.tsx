import {useParams} from "@tanstack/react-router";
import EditRecordTemplateCell from "@/Pages/EditFormTemplatePage/EditRecordTemplateCell";
import React, {Suspense} from "react";
import PageContentSection from "@/Components/PageContentSection";
import BreadCrumb from "@/Components/BreadCrumbs/BreadCrumb";
import {
	getEditRecordTemplatesPageBreadCrumb,
	getViewProjectPageBreadCrumb
} from "@/Constants/breadcrumbs";
import {ImSpinner2} from "react-icons/im";

export default function EditRecordTemplatePage() {
	const params = useParams({from: "/layout/record-templates/$recordTemplateId/edit"});

	return (
		<div>
			<BreadCrumb
				pages={getEditRecordTemplatesPageBreadCrumb({templateId: params.recordTemplateId})}/>
			<PageContentSection>
				<Suspense
					fallback={<div className={'flex flex-col align-middle place-items-center'}>
						<ImSpinner2 className="animate-spin h-12 w-12"/></div>
					}>
					<EditRecordTemplateCell templateId={params.recordTemplateId}/>
				</Suspense>
			</PageContentSection>
		</div>
	)
}
