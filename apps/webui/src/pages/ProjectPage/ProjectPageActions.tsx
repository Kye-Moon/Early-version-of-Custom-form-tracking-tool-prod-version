import {EditIcon} from "lucide-react";
import {Button} from "@/Primitives/Button/Button";
import {useNavigate, useParams} from "@tanstack/react-router";

/**
 * This is a component that is used in the PageHeadingWithMetaAndActions component
 * It is a button that navigates to the edit job page
 * TODO: Should be able to navigate via a function surely? this should not be needed
 * @constructor
 */
export function ProjectPageActions() {
    const navigate = useNavigate();
    const params = useParams({from: "/layout/projects/$projectId"});

    return (
        <Button onClick={() => navigate({to: '/projects/$projectId/edit', params: {projectId: params.projectId}})}
                variant={'default'}
                size={'sm'}>
            <EditIcon className={'w-4 mr-2'}/>
            <span>Edit Project</span>
        </Button>
    )
}
