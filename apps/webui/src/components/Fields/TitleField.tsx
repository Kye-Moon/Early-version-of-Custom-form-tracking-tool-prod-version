"use client";

import { ElementsType, FormElement, FormElementInstance } from "form-types";
import { Label } from "@/Primitives/Label";
import { Input } from "@/Primitives/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "@/Hooks/useDesigner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Primitives/Form";
import { LuHeading1 } from "react-icons/lu";
import {
	TitleFieldCustomInstance,
	titleFieldExtraAttributes,
	titleFieldPropertiesFormSchemaType,
	titleFieldPropertiesSchema
} from "form-types/TitleField";

const type: ElementsType = "TitleField";

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: titleFieldExtraAttributes
  }),
  designerBtnElement: {
    icon: LuHeading1,
    label: "Title field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};



function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TitleFieldCustomInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TitleFieldCustomInstance;

  const { title } = element.extraAttributes;
  return <p className="text-xl">{title}</p>;
}



function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TitleFieldCustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<titleFieldPropertiesFormSchemaType>({
    resolver: zodResolver(titleFieldPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: titleFieldPropertiesFormSchemaType) {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
