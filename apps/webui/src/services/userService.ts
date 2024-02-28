import {graphql} from "gql-types";

export const inviteUser = graphql(`
    mutation InviteUser($input: InviteUserInput!) {
        inviteUser(inviteInput: $input)
    }
`);

export const initialiseUserMutation = graphql(`
    mutation InitialiseUser {
        initialiseUser {
            id
        }
    }
`)

export const checkUserInitialisedQuery = graphql(`
    query IsUserInitialised {
        isUserInitialised
    }
`)
