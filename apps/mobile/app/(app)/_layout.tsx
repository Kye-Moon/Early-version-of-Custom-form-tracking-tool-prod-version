import {Stack, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {useAuth, useUser} from "@clerk/clerk-expo";
import {setContext} from "@apollo/client/link/context";
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, useMutation} from "@apollo/client";
import {useRecoilValueLoadable} from "recoil";
import {apiUrlState} from "../../state/atoms";
import {onError} from "@apollo/client/link/error";
import {Image, Spinner, View} from "@gluestack-ui/themed";
import {graphql} from "gql-types";
import {GlobalFallback} from "../../components/Error/GlobalErrorBoundary";
import ErrorBoundary from "react-native-error-boundary";

export const initialiseUserMutation = graphql(`
    mutation InitialiseUser {
        initialiseUser {
            id
        }
    }
`)
export default function RootLayout() {
    const {isLoaded, getToken, signOut} = useAuth();
    const [client, setClient] = useState<ApolloClient<any> | null>(null);
    const apiUrl = useRecoilValueLoadable(apiUrlState)
    const router = useRouter();

    useEffect(() => {
        const httpLink = new HttpLink({
            uri: apiUrl.getValue() ? `${apiUrl.getValue()}` : "",
            credentials: "include",
        })
        const authMiddleware = setContext(async (_, {headers}) => {
            // Call getToken before each request to ensure the latest token is used
            const token = await getToken();
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                    "Access-Control-Allow-Origin": "*",
                },
            };
        });

        const errorLink = onError(({graphQLErrors, networkError, forward, operation}) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({message}) => {
                    if (message === "Unauthorized") {
                        signOut().then(() => {
                            // Optionally, redirect to sign-in page or perform other cleanup
                            router.push('/sign-in');
                        });
                        return;
                    }
                })
            if (networkError) console.log(`[Network error]: ${networkError.message}`);
            return forward(operation);
        });

        // Initialize Apollo Client with the middleware that fetches the token dynamically
        const client = new ApolloClient({
            link: from([authMiddleware, errorLink, httpLink]),
            cache: new InMemoryCache(),
        });

        setClient(client);
    }, [apiUrl, getToken, signOut]);

    if (!isLoaded || !client) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image alt={'logo'} source={require('../../assets/images/icon.png')} style={{width: 100, height: 100}}/>
                <Spinner/>
            </View>
        )
    }

    return (
        <ErrorBoundary FallbackComponent={GlobalFallback}>
            <ApolloProvider client={client}>
                <RootLayoutNav/>
            </ApolloProvider>
        </ErrorBoundary>
    )
}


function RootLayoutNav() {
    const [initialiseUser] = useMutation(initialiseUserMutation)
    const {user} = useUser();
    const {isSignedIn} = useAuth();

    useEffect(() => {
        const initUser = async () => {
            await initialiseUser()
            await user?.reload()
        }
        // if (isSignedIn && !user?.publicMetadata.varify_initialised){
        initUser()
        // }
    }, [user?.publicMetadata.varify_initialised, isSignedIn])

    if (!user?.publicMetadata.varify_initialised) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image alt={'logo'} source={require('../../assets/images/icon.png')} style={{width: 100, height: 100}}/>
                <Spinner/>
            </View>
        )
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="new-job-record" options={{headerShown: false}}/>
            <Stack.Screen name="job/[id]" options={{headerShown: false}}/>
            <Stack.Screen name="job-record/[id]" options={{headerShown: false}}/>
        </Stack>
    );
}