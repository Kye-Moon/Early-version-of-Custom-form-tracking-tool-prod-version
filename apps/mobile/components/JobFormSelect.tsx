import {FormElementInstance} from "form-types";
import FormLabel from "./FormLabel";
import React, {useState} from "react";
import {
    FormControlLabel, FormControlLabelText,
    Icon,
    ScrollView,
    Select,
    SelectBackdrop,
    SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger, VStack
} from "@gluestack-ui/themed";
import {SelectIcon} from "../config/theme";
import {ChevronDownIcon} from "lucide-react-native";
import {graphql} from "gql-types";
import {useFormContext} from "react-hook-form";
import {
    NewJobRecordFormType
} from "webui/src/components/JobRecords/NewJobRecordDialog/NewJobRecordForm/NewJobRecordFormSchema";
import {useSuspenseQuery} from "@apollo/client";
import {job} from "server/dist/src/drizzle/schema";
import {StyleSheet} from "react-native";
import {NewJobRecordDetailsFormType} from "../app/(app)/new-job-record/newJobRecordFormSchema";
import values from "ajv/lib/vocabularies/jtd/values";

const query = graphql(`
    query JobFormSelect($jobId: String!) {
        job(id: $jobId) {
            jobForms {
                id
                name
                description
                category
                status
                structure
            }
        },
    }
`)


interface JobFormSelectProps {
    setFormStructure: (formStructure: FormElementInstance[]) => void;
    setFormId: (value: string) => void;
    jobId: string;
}

export default function JobFormSelect({setFormStructure, jobId, setFormId}: JobFormSelectProps) {
    const {data} = useSuspenseQuery(query, {variables: {jobId: jobId}, skip: !jobId})

    const items = data?.job.jobForms?.map((item: any) => ({
        value: item.id,
        label: item.name,
        content: item.structure
    })) || [];

    return (
        <VStack>
            <FormControlLabel>
                <FormControlLabelText>Form Select </FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={
                (value) => {
                    setFormId(value);
                    const formStructure = items.find((item) => item.value === value)?.content;
                    setFormStructure(formStructure.elements);
                }
            }>
                <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Select option"/>
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop/>
                    <SelectContent style={styles.container}>
                        {jobId ? (
                            <>
                                <SelectItem label="Choose a form" value={""} isDisabled={false}/>
                                <ScrollView width={'100%'}>
                                    {
                                        items.map((item) => {
                                            return (
                                                <SelectItem key={item.value} label={item.label} value={item.value}/>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </>
                        ) : (
                            <SelectItem label="Choose a Job first" value={""} isDisabled={false}/>
                        )}
                    </SelectContent>
                </SelectPortal>
            </Select>
        </VStack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

});