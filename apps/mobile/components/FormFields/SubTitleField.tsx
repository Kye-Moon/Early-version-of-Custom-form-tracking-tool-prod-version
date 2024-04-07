import {ElementsType, FormElementInstance, MobileFormElement} from "form-types";
import {SubTitleCustomInstance} from "form-types/SubTitleField";
import {Text} from "@gluestack-ui/themed";
import React from "react";

const type: ElementsType = "SubTitleField";

function FormComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as SubTitleCustomInstance;

    const {title} = element.extraAttributes;
    return <Text size={'sm'}>{title}</Text>;
}

export const SubTitleFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: () => true,
};