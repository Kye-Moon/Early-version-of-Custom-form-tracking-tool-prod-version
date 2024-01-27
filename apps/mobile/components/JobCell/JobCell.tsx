import React from "react";
import {
    Badge,
    Box,
    Divider,
    HStack,
    ScrollView,
    Text,
    View,
    VStack,
    BadgeText, Pressable, Button, ButtonIcon
} from "@gluestack-ui/themed";
import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";
import {Linking, StyleSheet} from "react-native";
import ScreenSection from "../ScreenSection";
import ScreenContentSection from "../ScreenContentSection";
import LabelAndValue from "../LabelAndValue";
import {enumToSentenceCase, truncate} from "../../lib/utils";
import dayjs from "dayjs";
import {EyeIcon} from "lucide-react-native";


const query = graphql(`
    query JobCell($jobId: String!) {
        job(id: $jobId) {
            id
            title
            description
            status
            customerName
            dueDate
            variations {
                id
                title
                description
            }
            attachments {
                id
                name
                url
            }
        }
    }
`);
export default function JobCell({jobId}: { jobId: string }) {
    const {data} = useSuspenseQuery(query, {variables: {jobId: jobId}})
    return (
        <ScreenSection>
            <ScrollView>
                <View marginBottom={80}>
                    <ScreenContentSection heading={"Details"}>
                        <View style={styles.container}>
                            <LabelAndValue label={'Status'} value={
                                <Badge><BadgeText>{data.job?.status ? enumToSentenceCase(data.job?.status) : "-"}</BadgeText></Badge>}/>
                        </View>
                        <View style={styles.container}>
                            <LabelAndValue label={'Customer'} value={data.job.customerName}/>
                            <LabelAndValue label={'Due Date'} value={dayjs(data.job?.dueDate).format('DD/MM/YYYY')}/>
                        </View>
                        <View style={styles.container}>
                            <LabelAndValue label={'Description'} value={data.job?.description}/>
                        </View>
                    </ScreenContentSection>
                    <ScreenContentSection heading={"Job Records"}>
                        {data.job?.variations?.length === 0 && (
                            <Text>No job records yet</Text>
                        )}
                        {data.job?.variations?.map((variation: any) => {
                            return (
                                <Box
                                    key={variation.id}
                                    p={2}
                                    rounded="$lg"
                                    overflow="hidden"
                                    m={2}
                                >
                                    <HStack style={styles.row}>
                                        <VStack>
                                            <Text size="md">{variation.title}</Text>
                                            <Text
                                                size={'2xs'}>{variation.description ? truncate(variation.description, 25) : "-"}</Text>
                                        </VStack>
                                    </HStack>
                                    <Divider my={'$2'}/>
                                </Box>
                            )
                        })}
                    </ScreenContentSection>
                    <ScreenContentSection heading={"Attachments"}>
                        {data.job?.attachments?.length === 0 && (
                            <Text>No attachments</Text>
                        )}
                        {data.job?.attachments?.map((attachment: any) => {
                            return (
                                <Box
                                    key={attachment.id}
                                    p={2}
                                    rounded="$lg"
                                    overflow="hidden"
                                    m={2}
                                >
                                    <HStack style={styles.row}>
                                        <Text size="md">{attachment.name}</Text>
                                        <Button onPress={() => Linking.openURL(attachment.url)} variant={'outline'}
                                                size={'xs'}>
                                            <ButtonIcon as={EyeIcon} size={'lg'}/>
                                        </Button>
                                    </HStack>
                                    <Divider my={'$2'}/>
                                </Box>
                            )
                        })}
                    </ScreenContentSection>
                </View>
            </ScrollView>
        </ScreenSection>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        overflow: 'hidden',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

