import {MobileFormElementsType} from "form-types";

import {TextFieldFormElement} from "./FormFields/TextField";
import {TitleFieldFieldElement} from "./FormFields/TitleField";
import {CheckboxFieldFormElement} from "./FormFields/CheckBoxField";
import {DateFieldFormElement} from "./FormFields/DateField";
import {NumberFieldFormElement} from "./FormFields/NumberField";
import {ParagprahFieldFormElement} from "./FormFields/ParagraphField";
import {SelectFieldFormElement} from "./FormFields/SelectField";
import {SeparatorFieldFormElement} from "./FormFields/SeparatorField";
import {SpacerFieldFormElement} from "./FormFields/SpacerFormField";
import {SubTitleFieldFormElement} from "./FormFields/SubTitleField";
import {TextAreaFormElement} from "./FormFields/TextAreaField";


export const FormElements: MobileFormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFieldElement,
    CheckboxField: CheckboxFieldFormElement,
    DateField: DateFieldFormElement,
    NumberField: NumberFieldFormElement,
    ParagraphField: ParagprahFieldFormElement,
    SelectField: SelectFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    TextAreaField: TextAreaFormElement
}