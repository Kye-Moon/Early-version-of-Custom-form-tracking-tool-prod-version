import {ElementsType, FormElementInstance, MobileFormElement, TextFieldCustomInstance} from "form-types";
import {TitleFieldCustomInstance} from "form-types/TitleField";
import {Text,} from "@gluestack-ui/themed";
import React from "react";
import {TitleFieldFormElement} from "webui/src/components/Fields/TitleField";

interface TitleFieldProps {
    elementInstance: FormElementInstance;
}

const type: ElementsType = "TitleField";


function FormComponent({elementInstance}: TitleFieldProps) {
    const element = elementInstance as TitleFieldCustomInstance;
    const {title} = element.extraAttributes
    return <Text size={'lg'} fontWeight={'$bold'}>{title}</Text>
}

export const TitleFieldFieldElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: () => true
}