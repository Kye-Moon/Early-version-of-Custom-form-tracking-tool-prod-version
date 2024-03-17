import DataTable from "@/Components/DataTable/DataTable";
import {useSuspenseQuery} from "@apollo/client";
import React, {useMemo} from "react";
import TableEmptyState from "@/Components/TableEmptyState";
import {convertProjectsToProjectsTableColumns, finaAllProjects} from "@/Services/projectService";
import {projectsTableColumns} from "@/Pages/ProjectsPage/ProjectsTableColumns";

export default function ProjectsTable() {
    const {data} = useSuspenseQuery(finaAllProjects);
    const projects = useMemo(() => convertProjectsToProjectsTableColumns(data), [data]);
    //Empty state
    if (projects.length === 0) {
        return (<TableEmptyState mainText={"No projects found"} subText={"Create a project to get started"}/>)
    }
    return (
        <div>
            <DataTable
                searchColumn={"title"}
                searchPlaceholder={"Search Projects By Name"}
                columns={projectsTableColumns}
                data={projects}
            />
        </div>
    );
}
