import {ElementsType, FormElement, FormElementInstance, MobileFormElement, SubmitFunction} from "form-types";
import {TextAreaCustomInstance, TextAreaExtraAttributes} from "form-types/TextAreaField";
import {useEffect, useState} from "react";
import {Label} from "webui/src/primitives/Label";
import {TextareaInput, Textarea, VStack, Text} from "@gluestack-ui/themed";
import FormLabel from "../FormLabel";
import React from "react";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {TextFieldFormElement} from "./TextField";

const type: ElementsType = "TextAreaField";


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
    const element = elementInstance as TextAreaCustomInstance;

    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText, rows} = element.extraAttributes;
    return (
        <VStack>
            <FormLabel label={label} error={error} required={required}/>
            <Textarea>
                <TextareaInput
                    placeholder={placeHolder}
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
            </Textarea>
            <Text size={'sm'} >{helperText}</Text>
        </VStack>
    );
}


export const TextAreaFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as TextAreaCustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.length > 0;
        }

        return true;
    },
};