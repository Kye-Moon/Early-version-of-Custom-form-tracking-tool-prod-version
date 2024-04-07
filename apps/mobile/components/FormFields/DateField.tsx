import {ElementsType, FormElementInstance, MobileFormElement, SubmitFunction} from "form-types";
import {HStack, Text, VStack} from "@gluestack-ui/themed";
import React, {useEffect, useState} from "react";
import {DateCustomInstance} from "form-types/DateField";
import DatePicker from "react-native-date-picker";
import FormLabel from "../FormLabel";

const type: ElementsType = "DateField";

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
    const element = elementInstance as DateCustomInstance;
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
    const [error, setError] = useState(false);
    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText} = element.extraAttributes;

    return (
        <VStack>

            <FormLabel label={label} error={error} required={required}/>
            <DatePicker
                onDateChange={(date) => {
                    setDate(date);
                    if (!submitValue) return;
                    const value = date?.toUTCString() || "";
                    const valid = DateFieldFormElement.validate(element, value);
                    setError(!valid);
                    submitValue(element.id, value);
                }}
                mode={'datetime'}
                date={date ?? new Date()}
            />
            <Text size={'sm'}>{helperText}</Text>

        </VStack>
    )

}

export const DateFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as DateCustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.length > 0;
        }

        return true;
    },
};