import React from "react";
import {useSuspenseQuery} from "@apollo/client";
import {jobRecordQuery} from "@/Services/variationService";
import ImageViewOverlay from "@/Components/ImageView/ImageViewOverlay";
import VariationJobRecordView from "@/Pages/JobRecordPage/Variation/VariationJobRecordView";
import JobRecordDetails from "@/Pages/JobRecordPage/JobRecordDetails/JobRecordDetails";

interface EditVariationPageCellProps {
    jobRecordId: string;
}

export default function JobRecordCell({jobRecordId}: EditVariationPageCellProps) {
    const {data} = useSuspenseQuery(jobRecordQuery, {variables: {id: jobRecordId}})
    const [selectedImage, setSelectedImage] = React.useState<string | undefined>(undefined)


    return (
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
    )
}
