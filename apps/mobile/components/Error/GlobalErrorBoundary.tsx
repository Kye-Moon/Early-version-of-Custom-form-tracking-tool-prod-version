import React from "react";
import {Button, View, Text, ButtonText} from "@gluestack-ui/themed";
import {StyleSheet} from "react-native";


export const GlobalFallback = (props: { error: Error, resetError: Function }) => (
    <View style={styles.container}>
        <Text style={styles.mainText}>Something happened!</Text>
        <Text style={styles.subText}>Sorry about that. An error occurred and we are unable to continue, please try
            again. If the problem
            persists, please contact support.</Text>
        <Text>{props.error.toString()}</Text>
        <Button onPress={() => props.resetError()}>
            <ButtonText>
                Try again
            </ButtonText>
        </Button>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    mainText: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 16,
        marginBottom: 20,
        marginHorizontal: 20,
        textAlign: 'center'
    }
});
