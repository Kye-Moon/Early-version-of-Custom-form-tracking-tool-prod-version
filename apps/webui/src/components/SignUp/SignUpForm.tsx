import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {Input} from "@/Primitives/Input";
import React from "react";
import {SignUpFormType} from "@/Components/SignUp/SignUpFormSchema";
import {Form, FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";

interface SignUpFormProps {
	form: UseFormReturn<SignUpFormType>
	onSubmit: SubmitHandler<SignUpFormType>
	submitting: boolean
}

export default function SignUpForm({form, onSubmit, submitting}: SignUpFormProps) {


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto px-2">
				<div className={'col-span-1'}>
					<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 ">
						<div className="sm:col-span-1">
							<FormField
								control={form.control}
								name="firstName"
								render={({field}) => (
									<FormInputWrapper label={"First Name"}>
										<Input {...field} className={'h-10'}/>
									</FormInputWrapper>
								)}
							/>
						</div>
						<div className="sm:col-span-1">
							<FormField
								control={form.control}
								name="lastName"
								render={({field}) => (
									<FormInputWrapper label={"Last Name"}>
										<Input {...field} className={'h-10'}/>
									</FormInputWrapper>
								)}
							/>
						</div>
						<div className="col-span-2">
							<FormField
								control={form.control}
								name="email"
								render={({field}) => (
									<FormInputWrapper label={"Email"}>
										<Input {...field} className={'h-10'}/>
									</FormInputWrapper>
								)}
							/>
						</div>
						<div className="col-span-2">
							<FormField
								control={form.control}
								name="password"
								render={({field}) => (
									<FormInputWrapper label={"Password"}>
										<Input {...field} className={'h-10'} type={"password"}/>
									</FormInputWrapper>
								)}
							/>
						</div>
						<div className="col-span-2">
							<FormField
								control={form.control}
								name="organization"
								render={({field}) => (
									<FormInputWrapper label={"Organization Name"}
													  description={"The name of your organization you want to create an account for"}>
										<Input {...field} className={'h-10'}/>
									</FormInputWrapper>
								)}
							/>
						</div>

					</div>
				</div>
				<div className={"flex justify-end"}>
					<LoadingButton onClick={form.handleSubmit(onSubmit)} label={"Submit"} loadingStatus={submitting} type={"submit"}/>
				</div>
			</form>
		</Form>
	);
}

