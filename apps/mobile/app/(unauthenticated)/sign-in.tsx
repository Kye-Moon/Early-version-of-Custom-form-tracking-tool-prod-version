import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    ButtonSpinner,
    ButtonText,
    Center,
    Image,
    Input,
    InputField,
    KeyboardAvoidingView,
    Pressable,
    Text
} from "@gluestack-ui/themed";
import {Alert, Platform, StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchema} from "./signinSchema";
import FormInputWrapper from "../../components/FormInputWrapper";
import {API_URLS, apiUrlState} from "../../state/atoms";
import {useRecoilState} from "recoil";
import {useAuth, useSignIn} from "@clerk/clerk-expo";

export default function SignIn() {
    const router = useRouter();
    const [logoPressCount, setLogoPressCount] = useState(0);
    const [apiUrl, setApi] = useRecoilState(apiUrlState);
    const {isSignedIn, isLoaded: isAuthLoaded, getToken} = useAuth();
    const {signIn, setActive, isLoaded} = useSignIn();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthLoaded && isSignedIn) {
            console.log('isSignedIn', isSignedIn);
            setLoading(false)
            router.push('/(app)/(tabs)')
        }
    }, [isSignedIn, isAuthLoaded]);

    const handlePressLogo = () => {
        if (logoPressCount === 4) {
            Alert.alert(
                'Select Server',
                'Select the server you’d like to use',
                Object.entries(API_URLS).map(([key, value]) => ({
                    text: key.toUpperCase(),
                    onPress: () => {
                        setApi(value);
                    },
                })),
            );
            setLogoPressCount(0);
        } else {
            setLogoPressCount(prev => prev + 1);
        }
    };


    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })


    const onSubmit = async (data: any) => {
        setLoading(true);
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignIn = await signIn.create({
                identifier: data.email.toLowerCase(),
                password: data.password,
            });
            await setActive({session: completeSignIn.createdSessionId});
        } catch (err: any) {
            setLoading(false);
            console.error(err.errors[0].message);
            Alert.alert('Error', err.errors[0].message);
        }

    }

    return (
        <Box style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : "height"}
                style={{flex: 1}}
            >
                <Center style={styles.content}>
                    <Pressable onPress={handlePressLogo}>
                        <Image alt={'logo'} source={require('../../assets/images/Logo.png')} style={styles.logo}/>
                        {apiUrl === API_URLS.local && <Text size={'xs'}>LOCAL</Text>}
                    </Pressable>
                    <Controller
                        control={form.control}
                        name="email"
                        render={({field, formState, fieldState}) => (
                            <FormInputWrapper title={'Email'} formState={formState} field={field}>
                                <Input w={'100%'}>
                                    <InputField
                                        type={'text'}
                                        textContentType={'oneTimeCode'}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        onChange={value => field.onChange(value.nativeEvent.text)}
                                    />
                                </Input>
                            </FormInputWrapper>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="password"
                        render={({field, formState, fieldState}) => (
                            <FormInputWrapper title={'Password'} formState={formState} field={field}>
                                <Input w={'100%'}>
                                    <InputField
                                        type={'password'}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        onChange={value => field.onChange(value.nativeEvent.text)}
                                    />
                                </Input>
                            </FormInputWrapper>
                        )}
                    />
                    <Button w={'100%'} mx={'$8'} onPress={form.handleSubmit(onSubmit)}>
                        {loading ? <ButtonSpinner/> : <ButtonText>Sign in</ButtonText>}
                    </Button>
                    <Pressable onPress={() => router.push('/reset-password')}>
                        <Text size={'sm'}>Forgot password?</Text>
                    </Pressable>
                </Center>
            </KeyboardAvoidingView>
        </Box>
    );
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
        marginHorizontal: 30,
        gap: 40
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    }
});
