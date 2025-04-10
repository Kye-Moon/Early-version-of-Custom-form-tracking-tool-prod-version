import {SubmitHandler, UseFormReturn} from "react-hook-form";
import React from "react";
import {Form, FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";
import {OTPFormType} from "@/Components/SignUp/OTPFormSchema";
import OTPInputComponent from "@/Components/OTPInputComponent";

interface OTPFormProps {
	form: UseFormReturn<OTPFormType>
	onSubmit: SubmitHandler<OTPFormType>
	submitting: boolean
}

export default function OTPForm({form, onSubmit, submitting}: OTPFormProps) {

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
				<div className={''}>
					<div className="flex justify-center">
						<div className="">
							<FormField
								control={form.control}
								name="code"
								render={({field}) => (
									<FormInputWrapper label={"Code"}>
										<OTPInputComponent field={field} length={6}/>
									</FormInputWrapper>
								)}
							/>
						</div>
					</div>
				</div>

				<div className={"flex justify-end"}>
					<LoadingButton label={"Submit"} loadingStatus={submitting} type={"submit"}/>
				</div>
			</form>
		</Form>
	);
}

