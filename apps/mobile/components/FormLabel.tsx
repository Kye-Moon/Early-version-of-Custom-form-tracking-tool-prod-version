import {HStack, Text, View} from "@gluestack-ui/themed";
import React from "react";

interface FormLabelProps {
    label: string
    error?: boolean
    required?: boolean
}
export default function FormLabel({label, error, required}: FormLabelProps) {
    return (
        <HStack gap={'$1'}>
            <Text color={error ? 'red' : 'black'}>{label}</Text>
            {required && <Text ml={2} color={'red'}>*</Text>}
        </HStack>
    )
}