import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";
import ScreenSection from "./ScreenSection";
import {ScrollView, View} from "@gluestack-ui/themed";
import ScreenContentSection from "./ScreenContentSection";
import LabelAndValue from "./LabelAndValue";
import React from "react";
import {StyleSheet} from "react-native";
import {ImageGrid} from "./ImageGridPreview";

const query = graphql(`
    query VariationCell($variationId: String!) {
        jobRecord(id: $variationId) {
            id
            title
            description
            job {
                title
                customerName
            }
            submittedBy {
                name
            }
            initialData {
                hours
                numPeople
                who
                materials
                equipment
            }
            images {
                id
                url
            }
            scopeItem {
                title
                reference
                description
            }
        }
    }
`)

export default function JobRecordCell({variationId}: { variationId: string }) {
    const {data} = useSuspenseQuery(query, {variables: {variationId: variationId}})
    return (
        <ScreenSection>
            <ScrollView>
                <ScreenContentSection heading={"Details"}>
                    <View style={styles.details}>
                        <LabelAndValue label={'Job'} value={data.jobRecord.title}/>
                        <LabelAndValue label={'Scope Reference'}
                                       value={data.jobRecord.scopeItem ? `[${data.jobRecord.scopeItem?.reference}] - ${data.jobRecord.scopeItem?.title}` : '-'}/>
                        <LabelAndValue label={'Customer'} value={data.jobRecord.job.customerName}/>
                        <LabelAndValue label={'Submitted by'} value={data.jobRecord.submittedBy.name}/>
                        <LabelAndValue label={'Description'} value={data.jobRecord.description}/>
                    </View>
                </ScreenContentSection>
                {data.jobRecord.initialData && (
                    <ScreenContentSection heading={"Initial Information"}>
                        <View style={styles.container}>
                            <LabelAndValue label={'Est. hours'} value={data.jobRecord.initialData?.hours}/>
                            <LabelAndValue label={'Num people'} value={data.jobRecord.initialData?.numPeople}/>
                        </View>
                        <View style={styles.container}>
                            <LabelAndValue label={'Who?'} value={data.jobRecord.initialData?.who}/>
                        </View>
                        <View style={styles.container}>
                            <LabelAndValue label={'Material'} value={data.jobRecord.initialData?.materials}/>
                        </View>
                        <View style={styles.container}>
                            <LabelAndValue label={'Equipment'} value={data.jobRecord.initialData?.equipment}/>
                        </View>
                    </ScreenContentSection>
                )}
                <ScreenContentSection heading={"Images"}>
                    <ImageGrid images={data.jobRecord.images} size={4}/>
                </ScreenContentSection>
                <View padding={'$10'}></View>
            </ScrollView>
        </ScreenSection>
    )
}
const styles = StyleSheet.create({
    details: {
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
    },
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
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 8,
    },
})
