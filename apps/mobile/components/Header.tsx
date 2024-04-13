import {Box, Center, HStack, Pressable, Text} from "@gluestack-ui/themed";
import {ChevronLeftIcon} from "lucide-react-native";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {truncate} from "../lib/utils";

interface Props {
    title?: string
}

const {width, height} = Dimensions.get('window');

export default function Header({title}: Props) {
    const router = useRouter();
    return (
        <HStack w="100%" h={height * 0.1} py={'$2'} alignItems="center">
            <Box style={styles.box}>
                <Pressable onPress={router.back}>
                    <ChevronLeftIcon color={'#000'} size={'32px'}/>
                </Pressable>
            </Box>
            <Center style={styles.box}>
                <Text style={styles.text}>{title ? truncate(title, 15) : "Job record"}</Text>
            </Center>
            <Box style={styles.box}/>
        </HStack>
    )
}

const styles = StyleSheet.create({
    box: {
        height: height * 0.1,
        marginVertical: 12,
        width: "33.333%",
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        borderBottomWidth: 0.2,
        borderBottomColor: '#ccc',
        paddingBottom: 6,
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        paddingBottom: 4,
    }
})
