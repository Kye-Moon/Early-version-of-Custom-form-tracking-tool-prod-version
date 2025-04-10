import React, {useState} from "react";
import Logo from '@/Assets/Logo.png'
import {useAuth, useSignUp} from "@clerk/clerk-react";
import {Link, useRouter} from "@tanstack/react-router";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/Primitives/Card";
import SignUpForm from "@/Components/SignUp/SignUpForm";
import OTPForm from "@/Components/SignUp/OTPForm";
import {useForm} from "react-hook-form";
import {signUpFormSchema, SignUpFormType} from "@/Components/SignUp/SignUpFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {otpFormSchema, OTPFormType} from "@/Components/SignUp/OTPFormSchema";
import toast from "react-hot-toast";
import {useMutation} from "@apollo/client";
import {signUpMutation} from "@/Services/authService";

export default function SignUpPage() {
	const {isSignedIn, isLoaded, signOut} = useAuth();
	const [isVerifying, setIsVerifying] = useState(false);
	const {signUp, setActive} = useSignUp();
	const [loadingLocal, setLoadingLocal] = useState(false);
	const router = useRouter();
	const [waitingServerSideSignUp, setWaitingServerSideSignUp] = useState(false);


	const [_signUp, {loading, error}] = useMutation(signUpMutation, {
		onCompleted: () => {
			toast.success("Sign up successful")
		},
	})

	if (isSignedIn && isLoaded && !waitingServerSideSignUp) {
		router.navigate({to: "/dashboard"});
	}


	const signUpForm = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		mode: "onBlur",
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			organization: '',
		}
	});

	const otpForm = useForm<OTPFormType>({
		resolver: zodResolver(otpFormSchema),
		defaultValues: {
			code: '',
		}
	});

	const handleSubmitSignUp = async (values: SignUpFormType) => {
		setLoadingLocal(true)
		try {
			await signUp?.create({
				emailAddress: values.email,
				password: values.password,
				firstName: "Kye",
				lastName: "Moon",
			})
			// send the email.
			await signUp?.prepareEmailAddressVerification({strategy: "email_code"});
			setIsVerifying(true);
			setLoadingLocal(false)
		} catch (e) {
			//@ts-ignore
			const errorMessage = e.errors[0].message;
			toast.error(errorMessage)
			setLoadingLocal(false)
		}
	}

	const handleSubmitOTP = async (values: OTPFormType) => {
		try {
			const completeSignUp = await signUp?.attemptEmailAddressVerification({
				code: values.code,
			});
			if (completeSignUp?.status !== "complete") {
				toast.error("Invalid")
				return;
			}
			if (completeSignUp?.status === "complete") {
				setWaitingServerSideSignUp(true);
				await setActive?.({session: completeSignUp.createdSessionId});
				await _signUp({
					variables: {
						input: {
							firstName: signUpForm.getValues('firstName'),
							lastName: signUpForm.getValues('lastName'),
							email: signUpForm.getValues('email'),
							organizationName: signUpForm.getValues('organization'),
						}
					},
					onError: async () => {
						toast.error("Error signing up")
						await signOut()
					},
					onCompleted: async (data) => {
						await setActive?.({
							session: completeSignUp.createdSessionId,
							organization: data.signUp.authOrgId
						});

						toast.success("Sign up successful")
						setWaitingServerSideSignUp(false);
					}
				});
			}
			setIsVerifying(false);
		} catch (e) {
			//@ts-ignore
			const errorMessage = e.errors[0].longMessage;
			toast.error(errorMessage)
			otpForm.reset()
		}
	}


	return (
		<div className={'h-screen flex flex-col items-center justify-center space-y-6'}>
			<img src={Logo} alt={'Synex Logo'} className={'h-24'}/>
			<h1 className={'text-xl font-semibold'}>Varify</h1>

			{/** A Login Form for email and password */}
			<div className={'flex flex-col items-center justify-center space-y-6'}>
				<Card className={'w-[450px]'}>
					<CardHeader>
						<CardTitle>Create an account</CardTitle>
						<h3 className={'text-sm text-muted-foreground'}>Sign up to get started</h3>
					</CardHeader>
					<CardContent>
						{isVerifying
							?
							<OTPForm form={otpForm} onSubmit={handleSubmitOTP} submitting={loadingLocal || loading || waitingServerSideSignUp}/>
							: <SignUpForm form={signUpForm} onSubmit={handleSubmitSignUp}
										  submitting={loadingLocal  || loading || waitingServerSideSignUp}/>
						}
					</CardContent>
					<CardFooter className={'flex justify-center'}>
						<div className={'flex flex-col space-y-4  w-full '}>
							<div className={'flex justify-center items-center space-y-2 flex-col'}>
								<div className={'flex justify-start'}>
									<Link to='/login' params={{}} search={''}>Already have an
										account? Sign in</Link>
								</div>
							</div>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

