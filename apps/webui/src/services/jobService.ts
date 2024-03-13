import {graphql, JobsTableSearchJobsQuery} from "gql-types";
import {JobsTableColumn} from "@/Components/Jobs/JobsTable/JobsTableColumns";

export const createNewJob = graphql(`
	mutation CreateJobMutation($input: CreateJobInput!) {
		createJob(createJobInput: $input) {
			id
			title
		}
	}
`);

export const updateJob = graphql(`
    mutation UpdateJob($input: UpdateJobInput!) {
        updateJob(updateJobInput: $input){
            id	
        }
    }
`);

export const dashboardSearchJobs = graphql(`
	query DashboardSearchJobs($input: JobSearchInput!) {
		searchJobs(jobSearchInput: $input) {
			id
			title
			customerName
			status
			dueDate
			description
		}
	}
`);

export const jobTableSearchJobs = graphql(`
	query JobsTableSearchJobs($input: JobSearchInput!) {
		searchJobs(jobSearchInput: $input) {
			id
			title
			status
			customerName
			dueDate
			variations {
				id
				type
				flag
			}
		}
	}
`);

export const jobSelectSearchJobs = graphql(`
    query JobSelectSearch($input: JobSearchInput!) {
        searchJobs(jobSearchInput: $input) {
            id
            title
        }
    }
`);

export const jobWithCrewQuery = graphql(`
	query JobWithCrew($jobId: String!) {
		job(id: $jobId) {
			id
			title
			description
			ownerId
			status
			customerName
			createdAt
			dueDate
		},
		jobCrew(jobId: $jobId) {
			id
			name
		}
	}
`);

export const jobPageQuery = graphql(`
	query JobPage($jobId: String!) {
		job(id: $jobId) {
			id
			title
		},
	}
`);



export const convertJobsToJobsTableColumns = (
	jobs: JobsTableSearchJobsQuery
): JobsTableColumn[] => {



	return jobs.searchJobs.map((job) => {
		const numVariations = job.variations?.filter((v) => v.type === "VARIATION").length || 0;
		const numQA = job.variations?.filter((v) => v.type === "QA").length || 0;
		const numSafety = job.variations?.filter((v) => v.type === "SAFETY").length || 0;
		const numNotes = job.variations?.filter((v) => v.type === "NOTE").length || 0;

		const column: JobsTableColumn = {
			id: job.id,
			title: job.title,
			status: job.status || "-",
			customer: job.customerName || "-",
			numVariations: numVariations,
			qa: numQA,
			safety: numSafety,
			notes: numNotes,
		};
		return column;
	});
};
