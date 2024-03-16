import {useFormContext} from "react-hook-form";
import {FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import {Input} from "@/Primitives/Input";
import * as React from "react";
import DropSelect from "@/Components/DropSelect/DropSelect";
import {JobStatusSelectOptions} from "@/Constants/constants";
import {Textarea} from "@/Primitives/TextArea";
import {EditProjectFormType} from "@/Pages/ProjectPage/EditProject/EditProjectFormSchema";

export default function EditProjectDetails() {
    const {setValue, control} = useFormContext<EditProjectFormType>()
    return (
        <div className=" grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <FormField
                    control={control}
                    name="title"
                    render={({field}) => (
                        <FormInputWrapper label={"Title"}>
                            <Input onChange={field.onChange} value={field.value}/>
                        </FormInputWrapper>
                    )}
                />
            </div>
            <div className="sm:col-span-3">
                <FormField
                    control={control}
                    name="customer"
                    render={({field}) => (
                        <FormInputWrapper label={"Customer"}>
                            <Input {...field} />
                        </FormInputWrapper>
                    )}
                />
            </div>
            <div className="sm:col-span-2">
                <FormField
                    control={control}
                    name="status"
                    render={({field}) => (
                        <FormInputWrapper label={"Status"}>
                            <DropSelect
                                options={JobStatusSelectOptions}
                                defaultValue={field.value}
                                onChange={field.onChange}
                                placeholder={"Status"}
                            />
                        </FormInputWrapper>
                    )}
                />
            </div>
            <span className={'sm:col-span-6'}></span>
            <div className="sm:col-span-6">
                <FormField
                    control={control}
                    name="description"
                    render={({field}) => (
                        <FormInputWrapper label={"Description / Notes"}>
                            <Textarea {...field} />
                        </FormInputWrapper>
                    )}
                />
            </div>
        </div>
    )
}
