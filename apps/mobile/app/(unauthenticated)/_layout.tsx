import {Redirect, Stack} from 'expo-router';
import React from 'react';
import {useAuth} from "@clerk/clerk-expo";

export default function RootLayout() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    if (isLoaded && userId) {
        console.log(isLoaded, userId, sessionId);
        console.log('unAuthenticated to authenticated');
        return <Redirect href={'/(app)/(tabs)'}/>
    }
    return <RootLayoutNav/>;
}


function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{headerShown: false}}/>
            <Stack.Screen name="reset-password" options={{headerShown: true, headerTitle: "Reset Password"}}/>
        </Stack>
    );
}