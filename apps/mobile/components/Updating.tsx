import React from 'react'
import {StyleSheet} from 'react-native'
import {View, Text, Spinner, Image} from "@gluestack-ui/themed";

export default function Updating() {
    return (
        <View style={styles.container}>
            <Image
                alt={"Logo"}
                source={require('../assets/images/Logo.png')}
                style={{width: 50, height: 50}}
                resizeMode="contain"
            />
            <Text>
                Please wait while we update your app.
            </Text>
            <Spinner/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})