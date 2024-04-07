import {ElementsType, FormElementInstance, MobileFormElement} from "form-types";
import {TitleFieldCustomInstance} from "form-types/TitleField";
import {Text, VStack} from "@gluestack-ui/themed";
import React from "react";

const type: ElementsType = "ParagraphField";


function FormComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as TitleFieldCustomInstance;
    const {title} = element.extraAttributes
    return (
        <VStack>
            <Text>{title}</Text>
        </VStack>
    )
}

export const ParagprahFieldFormElement: MobileFormElement = {
    type,

    formComponent: FormComponent,

    validate: () => true,
};