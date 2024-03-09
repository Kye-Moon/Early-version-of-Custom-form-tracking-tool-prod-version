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

export const initialiseUserMutation = graphql(`
    mutation InitialiseUser {
        initialiseUser {
            id
        }
    }
`)
export default function RootLayout() {
    const {isLoaded, isSignedIn, userId, sessionId, getToken, signOut} = useAuth();
    const [clientReady, setClientReady] = useState(false);
    const [client, setClient] = useState<ApolloClient<any> | null>(null);
    const apiUrl = useRecoilValueLoadable(apiUrlState)
    const router = useRouter();

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
    useEffect(() => {
        if (isLoaded && userId && sessionId) {
            const setupApolloClient = async () => {
                const token = await getToken();
                const authMiddleware = setContext((_, {headers}) => ({
                    headers: {
                        ...headers,
                        "Access-Control-Allow-Origin": "*",
                        authorization: `Bearer ${token}`,
                    },
                }));

                const client = new ApolloClient({
                    link: from([authMiddleware, errorLink, httpLink]), // Assume errorLink and httpLink are defined elsewhere
                    cache: new InMemoryCache(),
                });

                setClient(client);
                setClientReady(true);
            };

            setupApolloClient().catch(console.error);
        }
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, userId, sessionId, getToken]);


    if (!isLoaded || !clientReady || !client) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image alt={'logo'} source={require('../../assets/images/icon.png')} style={{width: 100, height: 100}}/>
                <Spinner/>
            </View>
        ) // Show loading indicator while client is not ready
    }

    return (
        <ApolloProvider client={client}>
            <RootLayoutNav/>
        </ApolloProvider>
    )
}


function RootLayoutNav() {
    const [initialiseUser] = useMutation(initialiseUserMutation)
    const {user} = useUser();
    const {isLoaded, isSignedIn} = useAuth();

    useEffect(() => {
        const initUser = async () => {
            await initialiseUser()
            await user?.reload()
        }
        if (isLoaded && !user?.publicMetadata.varify_initialised) {
            initUser()
        }
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