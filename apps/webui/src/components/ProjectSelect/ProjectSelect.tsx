import ComboBox from "@/Components/ComboBox/ComboBox";
import {useState} from "react";
import {Label} from "@/Primitives/Label";
import {useSuspenseQuery} from "@apollo/client";
import {FindAllProjectsQuery} from "gql-types";
import {finaAllProjects} from "@/Services/projectService";

/*
 * CustomerSelect Props
 */
interface JobSelectProps {
    /**
     * Value of the ComboBox (the selected job)
     */
    value: string;
    /**
     * Function to set the value of the ComboBox (the selected job)
     * @param value
     */
    setValue: (value: string) => void;
}

export default function ProjectSelect({value, setValue}: JobSelectProps) {
    const [open, setOpen] = useState(false);
    const {data} = useSuspenseQuery(finaAllProjects);
    const projects = data?.projects?.map((proj: FindAllProjectsQuery['projects'][0]) => ({
        value: proj.id,
        label: proj.title
    })) || [];

    return (
        <div className={"flex flex-col space-y-1"}>
            <Label>Select Project</Label>
            <ComboBox
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                options={projects}
            />
        </div>
    );
}

