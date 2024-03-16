import React from "react";
import {VariationQuery} from "gql-types";
import {Textarea} from "@/Primitives/TextArea";
import DropSelect from "@/Components/DropSelect/DropSelect";
import {Form, FormField} from "@/Primitives/Form";
import {UseFormReturn} from "react-hook-form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import {Input} from "@/Primitives/Input";
import {
	jobRecordFlagSelectOptions,
	jobRecordTyoeSelectOptions,
	variationFlagSelectOptions,
	variationStatusSelectOptions
} from "@/Constants/constants";

interface ViewDetailsProps {
    jobRecord: VariationQuery['jobRecord']
    form: UseFormReturn<any>
}

export function EditDetails({jobRecord, form}: ViewDetailsProps) {

    return (
        <Form {...form}>
            <div className={'grid grid-cols-4 gap-2 mr-4'}>
                <div className={'col-span-2'}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormInputWrapper label={"Title"}>
                                <Input {...field} />
                            </FormInputWrapper>
                        )}
                    />
				</div>
                <div className={'col-span-2 '}>
                    <FormField
                        control={form.control}
                        name="customerName"
                        render={({field}) => (
                            <FormInputWrapper label={"Customer"}>
                                <Input {...field} />
                            </FormInputWrapper>
                        )}
                    />
                </div>
                <div className={'col-span-4'}>
                    <div className={'grid grid-cols-6'}>
                        {jobRecord.type === 'VARIATION' && (
                            <div className={'col-span-2'}>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormInputWrapper label={"Status"}>
                                            <DropSelect
                                                options={variationStatusSelectOptions}
                                                defaultValue={field.value}
                                                onChange={field.onChange}
                                                placeholder={"Status"}
                                            />
                                        </FormInputWrapper>
                                    )}
                                />
                            </div>
                        )}
                        <div className={'col-span-2 '}>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormInputWrapper label={"Record Type"}>
                                        <DropSelect
                                            options={jobRecordTyoeSelectOptions}
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                            placeholder={"Status"}
                                        />
                                    </FormInputWrapper>
                                )}
                            />
                        </div>
                        <div className={'col-span-2 '}>
                            <FormField
                                control={form.control}
                                name="flag"
                                render={({field}) => (
                                    <FormInputWrapper label={"Flag"}>
                                        <DropSelect
                                            options={jobRecord.type === 'VARIATION' ? variationFlagSelectOptions : jobRecordFlagSelectOptions}
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                            placeholder={"Status"}
                                        />
                                    </FormInputWrapper>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className={'col-span-4'}>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormInputWrapper label={"Description / Notes"}>
                                <Textarea {...field} />
                            </FormInputWrapper>
                        )}
                    />
                </div>
            </div>
        </Form>
    )
}

