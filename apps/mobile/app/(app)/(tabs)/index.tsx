import {StyleSheet} from 'react-native';
import React, {Suspense} from 'react';
import {Button, ButtonText, Text, View} from "@gluestack-ui/themed";
import VariationsCell from "../../../components/home/VariationsCell/VariationsCell";
import {Link} from "expo-router";
import LoadingSkeletonRows from "../../../components/Loading/SkeletonRows";

export default function VariationsScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Recent Job Records</Text>
                <Suspense fallback={<LoadingSkeletonRows rows={6}/>}>
                    <VariationsCell/>
                </Suspense>
            </View>
            <View style={styles.buttonContainer}>
                <Link asChild={true} href={{pathname: '/new-job-record/NewJobRecordForm'}}>
                    <Button
                        variant={'outline'}
                        width={'90%'}
                        size="xl"
                    >
                        <ButtonText>New Job Record</ButtonText>
                    </Button>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'space-between',
        paddingBottom: 24,
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 18,
        marginHorizontal: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
    },
});
