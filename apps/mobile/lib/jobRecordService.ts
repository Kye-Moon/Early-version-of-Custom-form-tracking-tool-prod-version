import {graphql}  from 'gql-types'
export const createMutation = graphql(`
    mutation CreateJobRecord($input: CreateJobRecordInput!) {
        createJobRecord(createJobRecordInput: $input) {
            id
        }
    }
`)

export const updateMutation = graphql(`
    mutation UpdateJobRecord($input: UpdateJobRecordInput!) {
        updateJobRecord(updateJobRecordInput: $input) {
            id
        }
    }
`)
