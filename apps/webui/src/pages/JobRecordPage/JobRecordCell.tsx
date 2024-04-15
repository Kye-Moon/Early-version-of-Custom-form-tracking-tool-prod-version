import React from "react";
import {useSuspenseQuery} from "@apollo/client";
import {jobRecordQuery} from "@/Services/variationService";
import ImageViewOverlay from "@/Components/ImageView/ImageViewOverlay";
import JobRecordDetails from "@/Pages/JobRecordPage/JobRecordDetails/JobRecordDetails";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {FormResponsePdf} from "@/Assets/formResponsePdf";
import {useOrganization} from "@clerk/clerk-react";
import {Button} from "@/Primitives/Button/Button";

interface EditVariationPageCellProps {
	jobRecordId: string;
}

export default function JobRecordCell({jobRecordId}: EditVariationPageCellProps) {
	const {data} = useSuspenseQuery(jobRecordQuery, {variables: {id: jobRecordId}})
	const [selectedImage, setSelectedImage] = React.useState<string | undefined>(undefined)
	const {organization} = useOrganization()

	return (
		<>
			<div className={'grid grid-cols-1 xl:grid-cols-3 xl:space-x-4'}>
				<div className={'col-span-2 border-r-2 '}>
					<JobRecordDetails jobRecord={data.jobRecord}/>
				</div>
				<div className={'col-span-1'}>
					<h3 className={'text-lg font-semibold'}>Images</h3>
					<div className={'py-2 space-y-2 flex flex-col align-middle'}>
						{data.jobRecord.images.map((image) => {
							return <img
								onClick={() => setSelectedImage(image.url)}
								key={image.id}
								className={'rounded'}
								src={image.url}
								alt={''}
							/>
						})}
						{selectedImage && <ImageViewOverlay setSelectedImage={setSelectedImage}
															imageUrl={selectedImage}/>}
					</div>
				</div>

			</div>
			<div className={'flex justify-end mt-8'}>
				<PDFDownloadLink document={
					<FormResponsePdf
						images={data.jobRecord.images.map((image) => image.url)}
						orgName={organization?.name}
						jobName={data.jobRecord.job.title ?? "Job"}
						submitedBy={data.jobRecord.submittedBy.name}
						organisationLogoUrl={organization?.imageUrl}
						createdAt={data.jobRecord.createdAt}
						formResponse={data.jobRecord.formResponse}
						jobForm={data.jobRecord.jobForm}
					/>
				}
								 fileName={`JobRecord_${data.jobRecord.title}_${data.jobRecord?.jobForm?.formTemplate.name}_${data.jobRecord.id.slice(0, 6)}.pdf`}>
					<Button variant={'outline'}>
						Export to PDF
					</Button>
				</PDFDownloadLink>
			</div>
		</>
	)
}
