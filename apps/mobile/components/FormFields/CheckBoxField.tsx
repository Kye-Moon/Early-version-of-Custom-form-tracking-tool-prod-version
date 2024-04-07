import {
    ElementsType,
    FormElementInstance,
    MobileFormElement,
    SubmitFunction,
    TextFieldCustomInstance
} from "form-types";
import {CheckBoxCustomInstance} from "form-types/CheckboxField";
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, HStack, Text, VStack} from "@gluestack-ui/themed";
import React, {useEffect, useState} from "react";
import {CheckIcon} from "lucide-react-native";

const type: ElementsType = "CheckboxField";

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

    const element = elementInstance as CheckBoxCustomInstance;

    const [value, setValue] = useState<boolean>(defaultValue === "true");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const {label, required, placeHolder, helperText} = element.extraAttributes;
    const id = `checkbox-${element.id}`;

    return (
        <VStack>
            <Checkbox
                aria-label={id}
                id={id}
                size="md" isInvalid={false} isDisabled={false} isChecked={value} value={String(value)}
                onChange={(checked) => {
                    let value = false;
                    if (checked) value = true;
                    setValue(value);
                    if (!submitValue) return;
                    const stringValue = value ? "true" : "false";
                    const valid = CheckboxFieldFormElement.validate(element, stringValue);
                    setError(!valid);
                    submitValue(element.id, stringValue);
                }}
            >
                <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon}/>
                </CheckboxIndicator>
                <CheckboxLabel>
                    <HStack>
                        <Text>
                            {label}
                        </Text>
                        <Text>
                            {required && '*'}
                        </Text>
                    </HStack>
                </CheckboxLabel>
            </Checkbox>
            <Text size={'sm'} >{helperText}</Text>
        </VStack>
    )

}

export const CheckboxFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CheckBoxCustomInstance;
        if (element.extraAttributes.required) {
            return currentValue === "true";
        }

        return true;
    },
};