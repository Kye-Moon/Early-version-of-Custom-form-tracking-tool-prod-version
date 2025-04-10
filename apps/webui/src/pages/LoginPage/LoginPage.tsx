import React, {useState} from "react";
import Logo from '@/Assets/Logo.png'
import {useAuth, useSignIn} from "@clerk/clerk-react";
import {Link, useRouter} from "@tanstack/react-router";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/Primitives/Card";
import {Label} from "@/Primitives/Label";
import {Input} from "@/Primitives/Input";
import {Button} from "@/Primitives/Button/Button";
import {SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {
	loginFormSchema, LoginFormType,
	signUpFormSchema,
	SignUpFormType
} from "@/Components/SignUp/SignUpFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {Form, FormField} from "@/Primitives/Form";
import FormInputWrapper from "@/Components/FormInputWrapper/FormInputWrapper";
import LoadingButton from "@/Components/Loading/LoadingButton/LoadingButton";

export default function Login() {
	const {isSignedIn, isLoaded} = useAuth();
	const {signIn, setActive} = useSignIn();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	if (isSignedIn && isLoaded) {
		router.navigate({to: "/dashboard"});
	}

	const loginForm = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		mode: "onBlur",
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const handleSubmitSignIn = async (values: LoginFormType) => {
		setLoading(true);
		try {
			await signIn?.create({
				strategy: 'password',
				identifier: values.email,
				password: values.password,
			});
			signIn?.createdSessionId && await setActive({session: signIn?.createdSessionId});
			toast.success("Login successful")
			setLoading(false);
		} catch (e) {
			toast.error("Invalid email or password")
			setLoading(false);
		}
	}


	return (
		<div className={'h-screen flex flex-col items-center justify-center space-y-6'}>
			<img src={Logo} alt={'Synex Logo'} className={'h-24'}/>
			<h1 className={'text-xl font-semibold'}>Varify</h1>
			{/** A Login Form for email and password */}
			<div className={'flex flex-col items-center justify-center space-y-6'}>
				<Card className={'w-[350px]'}>
					<CardHeader>
						<CardTitle>Sign in</CardTitle>
					</CardHeader>
					<CardContent>
						<LoginForm
							form={loginForm}
							onSubmit={handleSubmitSignIn}
							submitting={false}
						/>
					</CardContent>
					<CardFooter className={'flex justify-center'}>
						<div className={'flex flex-col space-y-4  w-full '}>
							<div className={'flex justify-center items-center space-y-2 flex-col'}>
								<div className={'flex justify-start space-x-1'}>
									<p className={'text-sm'}>Don't have an account?</p>
									<Link
										className={'text-sm text-indigo-950 hover:text-indigo-300'}
										to='/signup' params={{from: '/login'}} search={''}>Sign
										up</Link>
								</div>
								<Link className={'text-xs text-primary/50'} to='/forgot-password'>Forgot
									password?</Link>

							</div>
						</div>
					</CardFooter>


				</Card>
			</div>
		</div>
	);
}

interface LoginFormProps {
	form: UseFormReturn<SignUpFormType>
	onSubmit: SubmitHandler<SignUpFormType>
	submitting: boolean
}

export const LoginForm = ({form, onSubmit, submitting}: LoginFormProps) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto px-2">
				<div className={'col-span-1'}>
					<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 ">
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
					</div>
				</div>
				<div className={"flex justify-end"}>
					<LoadingButton onClick={form.handleSubmit(onSubmit)} label={"Submit"}
								   loadingStatus={submitting} type={"submit"}/>
				</div>
			</form>
		</Form>
	);
}

