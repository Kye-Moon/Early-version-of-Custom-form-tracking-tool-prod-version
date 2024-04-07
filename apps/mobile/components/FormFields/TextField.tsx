import {
    ElementsType,
    FormElementInstance,
    MobileFormElement,
    SubmitFunction,
    TextFieldCustomInstance
} from "form-types";
import React, {useEffect, useState} from "react";
import FormLabel from "../FormLabel";
import {Input, InputField, Text, VStack} from "@gluestack-ui/themed";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";

interface TextFieldProps {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}

const type: ElementsType = "TextField";

export const TextFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as TextFieldCustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.length > 0;
        }

        return true;
    },
};

function FormComponent({
                           elementInstance,
                           submitValue,
                           isInvalid,
                           defaultValue,
                       }: TextFieldProps) {
    const element = elementInstance as TextFieldCustomInstance;

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
                    value={value}
                    onChange={(e) => setValue(e.nativeEvent.text)}
                    onBlur={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                        if (!submitValue) return;
                        const isValid = TextFieldFormElement.validate(elementInstance, value);
                        setError(!isValid);
                        if (!isValid) return;
                        submitValue(element.id, e.nativeEvent.text);
                    }}
                />
            </Input>
            <Text>{helperText}</Text>
        </VStack>
    );
}