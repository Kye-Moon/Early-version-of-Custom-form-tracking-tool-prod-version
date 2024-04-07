import {
    ScrollView,
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger
} from "@gluestack-ui/themed";
import React from "react";
import {graphql} from "gql-types";
import {useSuspenseQuery} from "@apollo/client";
import {StyleSheet} from "react-native";

const query = graphql(`
    query JobSelect($input: JobSearchInput!) {
        searchJobs(jobSearchInput: $input) {
            id
            title
        }
    }
`);

interface JobSelectProps {
    onValueChange: (value: string) => void
}
export default function JobSelect({onValueChange}:JobSelectProps){
    const {data, error} = useSuspenseQuery(query, {
        variables: {input: {}}
    });

    return (
        <Select isRequired onValueChange={onValueChange}>
            <SelectTrigger variant="outline" size="md">
                <SelectInput placeholder="Select option" />
            </SelectTrigger>
            <SelectPortal >
                <SelectBackdrop />
                <SelectContent style={styles.container}>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Select a job" value="" isDisabled={true} />
                    <ScrollView width={'100%'}>
                        {
                            data?.searchJobs.map((job) => {
                                return (
                                        <SelectItem key={job.id} label={job.title ?? "-"} value={job.id} />
                                )
                            })
                        }
                    </ScrollView>
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

});