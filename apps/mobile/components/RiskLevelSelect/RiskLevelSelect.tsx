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
import {StyleSheet} from "react-native";

const RISK_LEVELS = [
    {value: "HIGH_RISK", label: "High Risk"},
    {value: "MEDIUM_RISK", label: "Medium Risk"},
    {value: "LOW_RISK", label: "Low Risk"},
]

interface ScopeItemSelectProps {
    onValueChange: (value: string) => void
    jobId?: string
}

export default function RiskLevelSelect({onValueChange, jobId}: ScopeItemSelectProps) {
    return (
        <Select isRequired onValueChange={onValueChange}>
            <SelectTrigger variant="outline">
                <SelectInput placeholder={"Eg. High Risk"}/>
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop/>
                <SelectContent style={styles.container}>
                    <SelectItem label="Choose a record type" value={""} isDisabled={false}/>
                    <ScrollView width={'100%'}>
                        {
                            RISK_LEVELS.map((risk) => {
                                return (
                                    <>
                                        <SelectItem key={risk.value} label={risk.label} value={risk.value}/>
                                    </>
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