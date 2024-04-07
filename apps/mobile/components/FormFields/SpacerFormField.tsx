import {ElementsType, FormElementInstance, MobileFormElement} from "form-types";
import {SpacerCustomInstance} from "form-types/SpacerField";
import {Box} from "@gluestack-ui/themed";
import React from "react";

const type: ElementsType = "SpacerField";

function FormComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    const element = elementInstance as SpacerCustomInstance;

    const {height} = element.extraAttributes;
    return <Box style={{height, width: "20%"}}></Box>;
}


export const SpacerFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: () => true,
};