import {FormElementInstance} from "form-types";
import {View} from "@gluestack-ui/themed";
import React from "react";
import {FormElements} from "./FormElements";

interface FormSubmitComponentProps {
    content: FormElementInstance[];
    submitValue: (key: string, value: string) => void; // Function to update form values
    isInvalid: (id: string) => boolean; // Function to check if a field is invalid
    getDefaultValue: (id: string) => string; // Function to get default values for Fields
}

export default function FormSubmitComponent({
                                                content,
                                                submitValue,
                                                isInvalid,
                                                getDefaultValue
                                            }: FormSubmitComponentProps) {
    return (
        <View gap={'$4'}>
            {content.map((element) => {
                const FormElement = FormElements[element.type].formComponent;
                return (
                    <FormElement
                        key={element.id}
                        elementInstance={element}
                        submitValue={submitValue}
                        isInvalid={isInvalid(element.id)} // Determines if the field should display as invalid
                        defaultValue={getDefaultValue(element.id)} // Ge
                    />
                );
            })}

        </View>
    )
}