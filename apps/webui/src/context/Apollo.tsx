import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";
import React, {useMemo} from "react";
import {onError} from "@apollo/client/link/error";
import {useAuth} from "@clerk/clerk-react";
import {setContext} from "@apollo/client/link/context";


export default function ApolloWrapper({children}: { children: React.ReactNode }) {
	const {getToken, signOut} = useAuth()

// Log any GraphQL errors or network error that occurred
	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
			graphQLErrors.forEach(({ message, locations, path }) => {
				if (message === "Unauthorized") {
					signOut()
				}
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				)
			});
		if (networkError) console.log(`[Network error]: ${networkError}`);
	});

	const httpLink = new HttpLink({
		uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
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
			link: from([errorLink, authMiddleware, httpLink]),
			cache: new InMemoryCache(),
		})
	}, [getToken])

	return (
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	)
}
