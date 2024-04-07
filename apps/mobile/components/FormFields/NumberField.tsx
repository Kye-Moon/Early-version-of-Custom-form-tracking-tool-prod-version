import {ElementsType, FormElementInstance, MobileFormElement, SubmitFunction} from "form-types";
import {NumberCustomInstance} from "form-types/NumberField";
import {Input, InputField, Text, VStack} from "@gluestack-ui/themed";
import FormLabel from "../FormLabel";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import React, {useEffect, useState} from "react";
import {TextFieldFormElement} from "./TextField";

const type: ElementsType = "NumberField";

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
    const element = elementInstance as NumberCustomInstance;

    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText} = element.extraAttributes;

    return (
        <VStack>
            <FormLabel
                label={label}
                required={required}
                error={error}
            />
            <Input>
                <InputField
                    keyboardType = 'numeric'
                    value={value}
                    onChange={(e) => {
                        if (parseFloat(e.nativeEvent.text) || e.nativeEvent.text === "") {
                            setValue(e.nativeEvent.text)
                        }
                    }}
                    onBlur={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        if (!submitValue) return;
                        const isValid = TextFieldFormElement.validate(elementInstance, value);
                        setError(!isValid);
                        if (!isValid) return;
                        submitValue(element.id, e.nativeEvent.text);
                    }}
                />
            </Input>
            <Text size={'sm'} >{helperText}</Text>
        </VStack>
    )

}

export const NumberFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as NumberCustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.length > 0;
        }

        return true;
    },
};