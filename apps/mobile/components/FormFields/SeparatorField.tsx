import {ElementsType, FormElement, FormElementInstance, MobileFormElement} from "form-types";
import React from "react";
import {Divider} from "@gluestack-ui/themed";

const type: ElementsType = "SeparatorField";

function FormComponent({elementInstance}: { elementInstance: FormElementInstance }) {
    return <Divider/>;
}

export const SeparatorFieldFormElement: MobileFormElement = {
    type,
    formComponent: FormComponent,
    validate: () => true,
};
