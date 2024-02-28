import {Redirect, Stack} from 'expo-router';
import React from 'react';
import {useAuth} from "@clerk/clerk-expo";

export default function RootLayout() {
    const {isLoaded, isSignedIn} = useAuth();
    if (isLoaded && isSignedIn) {
        return <Redirect href={'/(app)/(tabs)'}/>
    }
    return <RootLayoutNav/>;
}


function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{headerShown: false}}/>
            <Stack.Screen
                name="reset-password"
                options={{headerShown: true, headerTitle: "Reset Password"}}/>
        </Stack>
    );
}