import {useMutation, useSuspenseQuery} from "@apollo/client";
import {
	createVariationResource,
	deleteVariationResource,
	updateVariationResource,
	variationResources
} from "@/Services/variationResourceService";
import {CreateVariationResourceInput, UpdateVariationResourceInput} from "gql-types";
import {useMemo} from "react";

interface VariationResourceHookProps {
    variationId: string;
}

export default function useVariationResources({variationId}: VariationResourceHookProps) {
    const {data} = useSuspenseQuery(variationResources, {variables: {variationId: variationId}})

    const labourResources = useMemo(() => {
        if (!data) return []; // Return an empty array if data is not available
        return data.variationResources
            .filter((resource) => resource.type === 'LABOUR')
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((resource) => ({
                id: resource.id,
                description: resource.description,
                hours: resource.hours,
                rate: resource.rate,
                numPeople: resource.numPeople,
            }))
    }, [data]); // Memo depends on the 'data' variable

    const materialResources = useMemo(() => {
        if (!data) return []; // Return an empty array if data is not available
        return data.variationResources
            .filter((resource) => resource.type === 'MATERIAL')
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((resource) => ({
                id: resource.id,
                description: resource.description,
                quantity: resource.quantity,
                unitPrice: resource.unitPrice,
            }))
    }, [data]); // Memo depends on the 'data' variable

    const equipmentResources = useMemo(() => {
        if (!data) return []; // Return an empty array if data is not available
        return data.variationResources
            .filter((resource) => resource.type === 'EQUIPMENT')
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((resource) => ({
                id: resource.id,
                description: resource.description,
                quantity: resource.quantity,
                unitPrice: resource.unitPrice,
            }))
    }, [data]); // Memo depends on the 'data' variable

    const otherResources = useMemo(() => {
        if (!data) return []; // Return an empty array if data is not available
        return data.variationResources
            .filter((resource) => resource.type === 'OTHER')
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((resource) => ({
                id: resource.id,
                description: resource.description,
                unitPrice: resource.unitPrice,
            }))
    }, [data]); // Memo depends on the 'data' variable


    const [create] = useMutation(createVariationResource, {
        refetchQueries: ['VariationResources','ResourceSummary'],
    })
    const [update] = useMutation(updateVariationResource, {
		refetchQueries: ['VariationResources','ResourceSummary'],
    })

    const [deleteResource] = useMutation(deleteVariationResource, {
		refetchQueries: ['VariationResources','ResourceSummary'],
    })

    const addResource = async (resource: Omit<CreateVariationResourceInput, 'jobRecordId'>) => {
        await create({variables: {input: {...resource, jobRecordId: variationId}}})
    }

    const updateResource = async (id: string, resource: UpdateVariationResourceInput) => {
        await update({variables: {input: {...resource, id: id}}})
    }

    const removeResource = async (id: string) => {
        await deleteResource({variables: {id: id}})
    }


    return {
        labourResources: labourResources ?? [],
        materialResources: materialResources ?? [],
        equipmentResources: equipmentResources ?? [],
        otherResources: otherResources ?? [],
        addResource,
        updateResource,
        removeResource
    }
}
