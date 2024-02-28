import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";
import React, {useMemo} from "react";
import {useRecoilValueLoadable} from "recoil";
import {apiUrlState} from "../state/atoms";
import {onError} from "@apollo/client/link/error";
import {useAuth} from "@clerk/clerk-expo";
import {setContext} from "@apollo/client/link/context";

export function ApolloWrapper({children}: React.PropsWithChildren) {
    const {getToken, signOut,sessionId} = useAuth();
    const apiUrl = useRecoilValueLoadable(apiUrlState)

    const errorLink = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({message}) => {
                if (message === "Unauthorized") {
                    signOut()
                }
            })
        if (networkError) console.log(`[Network error]: ${networkError.message}`);
    });

    const httpLink = new HttpLink({
        uri: apiUrl.getValue() ? `${apiUrl.getValue()}` : "",
        credentials: "include",
    })

    const client = useMemo(() => {
        const authMiddleware = setContext(async (operation, {headers}) => {
            const token = await getToken()
            return {
                headers: {
                    ...headers,
                    "Access-Control-Allow-Origin": "*",
                    authorization: `Bearer ${token}`,
                },
            }
        })

        return new ApolloClient({
            link: from([authMiddleware, errorLink, httpLink]),
            cache: new InMemoryCache(),
        })
    }, [getToken,sessionId])


    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
