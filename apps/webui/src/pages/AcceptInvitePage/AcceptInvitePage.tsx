import React, {useState} from "react";
import Logo from '@/Assets/Logo.png'
import {useAuth, useSignUp} from "@clerk/clerk-react";
import {useRouter, useSearch} from "@tanstack/react-router";
import {Card, CardContent, CardHeader, CardTitle,} from "@/Primitives/Card";
import toast from "react-hot-toast";
import {useMutation} from "@apollo/client";
import {signUpMutation} from "@/Services/authService";
import {useForm} from "react-hook-form";
import {
	acceptInviteFormSchema,
	AcceptInviteFormType,
	signUpFormSchema,
	SignUpFormType
} from "@/Components/SignUp/SignUpFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import AcceptInviteForm from "@/Pages/AcceptInvitePage/AcceptInviteForm";

export default function AcceptInvitePage() {
	const {isSignedIn, isLoaded, signOut} = useAuth();
	const [isVerifying, setIsVerifying] = useState(false);
	const {signUp, setActive} = useSignUp();
	const [loadingLocal, setLoadingLocal] = useState(false);
	const searchParams = useSearch({
		from: "/unAuthenticatedLayout/accept-invite",
	}) as { __clerk_ticket?: string };
	const router = useRouter();

	if (isSignedIn && isLoaded) {
		router.navigate({to: "/dashboard"});
	}
	const [waitingServerSideSignUp, setWaitingServerSideSignUp] = useState(false);

	const acceptInviteForm = useForm<AcceptInviteFormType>({
		resolver: zodResolver(acceptInviteFormSchema),
		mode: "onBlur",
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		}
	});

	const handleSubmitAcceptInvite = async (values: AcceptInviteFormType) => {
		setLoadingLocal(true)
		try {
			await signUp?.create({
				strategy: "ticket",
				ticket: searchParams.__clerk_ticket,
				emailAddress: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
			})

			// If the sign-up was completed, set the session to active
			if (signUp?.status === 'complete') {
				await setActive?.({ session: signUp.createdSessionId })
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(JSON.stringify(signUp, null, 2))
			}
		} catch (e) {
			//@ts-ignore
			const errorMessage = e.errors[0].message;
			toast.error(errorMessage)
		}
	}


	return (
		<div className={'h-screen flex flex-col items-center justify-center space-y-6'}>
			<img src={Logo} alt={'Synex Logo'} className={'h-24'}/>
			<p>
				{JSON.stringify(searchParams)}
			</p>
			<h1 className={'text-xl font-semibold'}>Varify</h1>
			{/** A Login Form for email and password */}
			<div className={'flex flex-col items-center justify-center space-y-6'}>
				<Card className={'w-[450px]'}>
					<CardHeader>
						<CardTitle>Accept Invite</CardTitle>
						<h3 className={'text-sm text-muted-foreground'}>Accept the invite to get
							started</h3>
					</CardHeader>
					<CardContent>
						<AcceptInviteForm
							form={acceptInviteForm}
							onSubmit={handleSubmitAcceptInvite}
							submitting={false}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

