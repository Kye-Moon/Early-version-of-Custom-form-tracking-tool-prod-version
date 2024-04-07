import {ElementsType, FormElement, FormElementInstance, MobileFormElement, SubmitFunction} from "form-types";
import {SelectCustomInstance, SelectExtraAttributes} from "form-types/SelectField";
import {useEffect, useState} from "react";
import {
    Icon,
    Select,
    SelectBackdrop,
    SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper,
    SelectInput, SelectItem,
    SelectPortal,
    SelectTrigger, Text,
    VStack
} from "@gluestack-ui/themed";
import {ChevronDownIcon} from "lucide-react-native";
import {SelectIcon} from "../../config/theme";
import React from "react";
import FormLabel from "../FormLabel";
import {StyleSheet} from "react-native";

const type: ElementsType = "SelectField";


function FormComponent({
                           elementInstance,
                           submitValue,
                           isInvalid,
                           defaultValue,
                       }: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}) {
    const element = elementInstance as SelectCustomInstance;

    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText, options} = element.extraAttributes;
    return (
        <VStack>
            <FormLabel label={label} required={required} error={error}/>
            <Select
                onValueChange={(value) => {
                    setValue(value);
                    if (!submitValue) return;
                    const valid = SelectFieldFormElement.validate(element, value);
                    setError(!valid);
                    submitValue(element.id, value);
                }}
            >
                <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder={placeHolder}/>
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop/>
                    <SelectContent style={styles.container}>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator/>
                        </SelectDragIndicatorWrapper>
                        {options.map((option) =>
                            <SelectItem key={option} label={option} value={option}/>
                        )}
                    </SelectContent>
                </SelectPortal>
            </Select>
            <Text size={'sm'} >{helperText}</Text>
        </VStack>
    )
}


export const SelectFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as SelectCustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.length > 0;
        }
        return true;
    },
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});