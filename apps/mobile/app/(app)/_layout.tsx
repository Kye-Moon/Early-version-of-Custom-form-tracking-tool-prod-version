import {Redirect, Stack} from 'expo-router';
import React from 'react';
import {useAuth} from "@clerk/clerk-expo";

export default function RootLayout() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    if (isLoaded && !userId && !sessionId) {
        return <Redirect href={'/sign-in'}/>
    }
    return <RootLayoutNav/>;
}


function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="new-job-record" options={{headerShown:false}}/>
            <Stack.Screen name="job/[id]" options={{headerShown:false}}/>
            <Stack.Screen name="job-record/[id]" options={{headerShown:false}}/>
        </Stack>
    );
}