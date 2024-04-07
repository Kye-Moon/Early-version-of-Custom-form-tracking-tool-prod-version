import { CheckboxFieldFormElement } from "@/Components/Fields/CheckboxField";
import { DateFieldFormElement } from "@/Components/Fields/DateField";
import { NumberFieldFormElement } from "@/Components/Fields/NumberField";
import { ParagprahFieldFormElement } from "@/Components/Fields/ParagraphField";
import { SelectFieldFormElement } from "@/Components/Fields/SelectField";
import { SeparatorFieldFormElement } from "@/Components/Fields/SeparatorField";
import { SpacerFieldFormElement } from "@/Components/Fields/SpacerField";
import { SubTitleFieldFormElement } from "@/Components/Fields/SubTitleField";
import { TextAreaFormElement } from "@/Components/Fields/TextAreaField";
import { TextFieldFormElement } from "@/Components/Fields/TextField";
import { TitleFieldFormElement } from "@/Components/Fields/TitleField";
import {FormElementsType} from "form-types";

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagprahFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
