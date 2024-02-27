import React from "react";
import Logo from '@/Assets/Logo.png'
import {SignIn} from "@clerk/clerk-react";

export default function Login() {
	console.log('Login Page')
	return (
		<div className={'h-screen flex flex-col items-center justify-center space-y-6'}>
			<img src={Logo} alt={'Synex Logo'} className={'h-24'}/>
			<SignIn path="/login" routing="path" signUpUrl={''} afterSignInUrl={window.location.origin + '/dashboard'}/>
		</div>
	);
}
