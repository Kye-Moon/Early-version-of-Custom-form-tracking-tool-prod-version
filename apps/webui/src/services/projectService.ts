import {FindAllProjectsQuery, graphql} from "gql-types";
import {ProjectsTableColumn} from "@/Pages/ProjectsPage/ProjectsTableColumns";

export const createNewProject = graphql(`
    mutation CreateProjectMutation($input: CreateProjectInput!) {
        createProject(createProjectInput: $input) {
            id
            title
        }
    }
`);

export const updateProject = graphql(`
    mutation UpdateProject($input: UpdateProjectInput!) {
        updateProject(updateProjectInput: $input){
            id
        }
    }
`);

export const finaAllProjects = graphql(`
    query FindAllProjects {
        projects {
            id
            title
            status
            customer
            description
            jobs {
                id
            }
        }
    }
`);


export const findProject = graphql(`
    query FindProject($id: String!) {
        project(id: $id) {
            id
            title
            customer
            status
            description
        }
    }
`);

export const deleteProject = graphql(`
    mutation RemoveProject($id: String!) {
        removeProject(id: $id){
            id
        }
    }
`);



export const convertProjectsToProjectsTableColumns = (
    projects: FindAllProjectsQuery
): ProjectsTableColumn[] => {
    return projects.projects.map((project) => {

        const column: ProjectsTableColumn = {
            id: project.id,
            title: project.title,
            status: project.status || "-",
            customer: project.customer || "-",
            description: project.description || "-",
            numJobs: project?.jobs?.length || 0,
        };
        return column;
    });
};
