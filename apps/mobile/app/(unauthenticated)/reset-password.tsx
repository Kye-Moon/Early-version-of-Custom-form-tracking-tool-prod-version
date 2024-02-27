import {
    Box,
    Button, ButtonSpinner,
    ButtonText,
    Center,
    Image,
    Input,
    InputField,
    KeyboardAvoidingView,
    View, VStack
} from "@gluestack-ui/themed";
import React, {useState} from "react";
import {Platform, StyleSheet, TextInput} from "react-native";
import {useSignIn} from "@clerk/clerk-expo";
import {Stack} from "expo-router";
import {LabelText} from "@gluestack-ui/themed/build/components/FormControl/styled-components";


export enum ResetPasswordStates {
    PHONE_NUMBER,
    OTP,
    NEW_PASSWORD,
}

export default function ResetPasswordScreen() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const {signIn, setActive} = useSignIn();
    const [loading, setLoading] = useState(false);

    // Request a passowrd reset code by email
    const onRequestReset = async () => {
        setLoading(true)
        try {
            await signIn!.create({
                strategy: 'reset_password_email_code',
                identifier: emailAddress
            });
            setSuccessfulCreation(true);
        } catch (err: any) {
            alert(err.errors[0].message);
        }
        setLoading(false)
    };

    // Reset the password with the code and the new password
    const onReset = async () => {
        setLoading(true)
        try {
            const result = await signIn!.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password
            });
            alert('Password reset successfully');

            // Set the user session active, which will log in the user automatically
            await setActive!({session: result.createdSessionId});
        } catch (err: any) {
            alert(err.errors[0].message);
        }
        setLoading(false)
    };
    return (
        <Box style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : "height"}
                style={{flex: 1}}
            >
                <Center style={styles.content}>
                    <Image alt={'logo'} source={require('../../assets/images/Logo.png')} style={styles.logo}/>
                    {!successfulCreation && (
                        <>
                            <VStack>
                                <LabelText>Email</LabelText>
                                <Input w={'80%'}>
                                    <InputField
                                        type={'text'}
                                        textContentType={'oneTimeCode'}
                                        value={emailAddress}
                                        onChange={value => setEmailAddress(value.nativeEvent.text)}
                                    />
                                </Input>
                            </VStack>
                            <Button onPress={onRequestReset}>
                                {loading ? <ButtonSpinner/> : <ButtonText>Request Reset Code</ButtonText>}
                            </Button>
                        </>
                    )}
                    {successfulCreation && (
                        <VStack w={'80%'} space={'lg'}>
                            <VStack>
                                <LabelText>Code</LabelText>
                                <Input w={'100%'}>
                                    <InputField
                                        placeholder={'Type the code you received by email'}
                                        type={'text'}
                                        textContentType={'oneTimeCode'}
                                        value={code}
                                        onChange={value => setCode(value.nativeEvent.text)}
                                    />
                                </Input>
                            </VStack>
                            <VStack>
                                <LabelText>New Password</LabelText>
                                <Input w={'100%'}>
                                    <InputField
                                        type={'password'}
                                        placeholder={'Type your new password'}
                                        textContentType={'oneTimeCode'}
                                        value={password}
                                        onChange={value => setPassword(value.nativeEvent.text)}
                                    />
                                </Input>
                            </VStack>
                            <Button onPress={onReset}>
                                {loading ? <ButtonSpinner/> : <ButtonText>Reset Password</ButtonText>}
                            </Button>
                        </VStack>
                    )}
                </Center>
            </KeyboardAvoidingView>
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 40
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#6c47ff',
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        margin: 8,
        alignItems: 'center'
    }
});

