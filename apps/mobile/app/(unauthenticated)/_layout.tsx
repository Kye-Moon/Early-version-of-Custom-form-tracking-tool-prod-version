import {Redirect, Stack} from 'expo-router';
import React from 'react';
import {useAuth} from "@clerk/clerk-expo";

export default function RootLayout() {
    const {isLoaded, userId} = useAuth();
    if (isLoaded && userId) {
        return <Redirect href={'/(app)/(tabs)'}/>
    }
    return <RootLayoutNav/>;
}


function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{headerShown: false}}/>
            <Stack.Screen
                options={{headerShown: true, headerTitle: "Reset Password"}}/>
        </Stack>
    );
}