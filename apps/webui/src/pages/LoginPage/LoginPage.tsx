import React from "react";
import Logo from '@/Assets/Logo.png'
import {SignIn, useAuth} from "@clerk/clerk-react";
import {useRouter} from "@tanstack/react-router";

export default function Login() {
	const {isSignedIn, isLoaded} = useAuth();
	const router = useRouter();
	if (isSignedIn && isLoaded) {
		console.log('Redirecting to dashboard')
		router.navigate({to: "/dashboard"});
	}
	return (
		<div className={'h-screen flex flex-col items-center justify-center space-y-6'}>
			<img src={Logo} alt={'Synex Logo'} className={'h-24'}/>
			<SignIn path="/login"
					signUpUrl={''}
					afterSignInUrl={'https://varify.synex.one/dashboard'}
			/>
		</div>
	);
}
