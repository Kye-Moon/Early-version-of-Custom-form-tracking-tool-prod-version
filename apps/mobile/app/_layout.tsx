import {Slot, SplashScreen} from "expo-router";
import {GluestackUIProvider, Text} from "@gluestack-ui/themed"
import {RecoilRoot} from "recoil";
import React, {Suspense, useEffect} from "react";
import {config} from "../config/gluestack-ui.config";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";

import {registerRootComponent} from "expo";
import {ClerkProvider} from "@clerk/clerk-expo";
import {tokenCache} from "../lib/tokenCache";
import * as Updates from 'expo-updates';
import Updating from "../components/Updating";
import Config from "../Config";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};
const {App} = require('expo-router/_app');
registerRootComponent(App);

if (__DEV__) {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();

    const reactotron = require("../reactotron-config").default;
    reactotron.initiate()
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function Root() {
    const [updating, setUpdating] = React.useState(false);

    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync();

            if (update.isAvailable) {
                setUpdating(true);
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
                setUpdating(false)
            }
        } catch (error) {
            // You can also add an alert() to see the error message in case of an error when fetching updates.
            alert(`Error fetching latest Expo update: ${error}`);
        }
    }

    useEffect(() => {
        onFetchUpdateAsync();
    }, []);

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);


    return (
        <GluestackUIProvider config={config}>
            {/*@ts-ignore*/}
            <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || Config.clerk_publishable_key}>
                <RecoilRoot>
                    <Suspense fallback={<Text>Loading...</Text>}>
                        {updating ? <Updating/> : <Slot/>}
                    </Suspense>
                </RecoilRoot>
            </ClerkProvider>
        </GluestackUIProvider>
    )
}
