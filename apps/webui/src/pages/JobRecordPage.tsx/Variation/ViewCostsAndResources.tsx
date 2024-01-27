import EditableLabourResourcesTable
	from "@/Pages/JobRecordPage.tsx/Variation/EditableLabourResourcesTable";
import EditableMaterialsResourcesTable
	from "@/Pages/JobRecordPage.tsx/Variation/EditableMaterialResourcesTable";
import EditableEquipmentResourcesTable
	from "@/Pages/JobRecordPage.tsx/Variation/EditableEquipmentResourcesTable";
import React, {Suspense} from "react";
import EditableMiscResourcesTable
	from "@/Pages/JobRecordPage.tsx/Variation/EditableMiscResourcesTable";

export function ViewCostsAndResources() {

	return (
		<>
			<div className={'grid grid-cols-4 space-y-2 '}>
				<div className={'col-span-4 '}>
					<h3 className={'text-md '}>Labour</h3>
				</div>
				<div className={'col-span-4 mr-4'}>
					<Suspense fallback={<div>Loading...</div>}>
						<EditableLabourResourcesTable/>
					</Suspense>
				</div>
				<div className={'col-span-4 pt-6 '}>
					<h3 className={'text-md font'}>Materials</h3>
				</div>
				<div className={'col-span-4 mr-4'}>
					<Suspense fallback={<div>Loading...</div>}>
						<EditableMaterialsResourcesTable/>
					</Suspense>
				</div>
				<div className={'col-span-4 pt-6 '}>
					<h3 className={'text-md'}>Equipment</h3>
				</div>
				<div className={'col-span-4 mr-4'}>
					<Suspense fallback={<div>Loading...</div>}>
						<EditableEquipmentResourcesTable/>
					</Suspense>
				</div>
				<div className={'col-span-4 pt-6 '}>
					<h3 className={'text-md'}>Other Misc</h3>
				</div>
				<div className={'col-span-4 mr-4'}>
					<Suspense fallback={<div>Loading...</div>}>
						<EditableMiscResourcesTable/>
					</Suspense>
				</div>
			</div>
		</>
	)
}
