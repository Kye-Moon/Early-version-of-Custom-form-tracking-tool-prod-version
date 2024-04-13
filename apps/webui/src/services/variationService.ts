import {graphql} from "gql-types";

export const jobRecordsTableQuery = graphql(`
    query JobRecordTableSearch($input: JobRecordSearchInput!) {
        searchJobRecords(jobRecordSearchInput: $input) {
            id
            title
            description
            createdAt
            status,
            type,
            flag,
            job {
                title
            }
            jobForm {
                formTemplate {
                    name
                }
            }
            submittedBy {
                name
            }
        }
    }
`)

export const dashboardNotificationsQuery = graphql(`
    query DashboardSearchVariations($input: JobRecordSearchInput!) {
		searchJobRecords(jobRecordSearchInput: $input) {
            id
            title
            description
            status,
            flag,
            type
            job {
                title
            }
            submittedBy {
                name
            }
        }
    }
`)

export const jobRecordQuery = graphql(`
	query JobRecord($id: String!) {
		jobRecord(id: $id) {
			id
			title
			description
			status
			type
			flag
			createdAt
			job {
				id
				title
				customerName
			}
			submittedBy {
				name
			}
			images {
				id
				url
			}
			jobForm {
				formTemplate {
					name
					description
					structure
				}
			}
			formResponse {
				response
			}
		}
	}
`)

export const jobRecordUpdateMutation = graphql(`
    mutation UpdateJobRecord($input: UpdateJobRecordInput!) {
        updateJobRecord(updateJobRecordInput: $input) {
            id
        }
    }
`);
