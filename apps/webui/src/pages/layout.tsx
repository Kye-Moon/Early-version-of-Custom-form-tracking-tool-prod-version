import React, {useEffect, useState} from "react";
import SideBar from "@/Components/Navigation/SideBar/SideBar";
import StickyTopMobileSideBar
	from "@/Components/Navigation/StickyTopMobileSideBar/StickyTopMobileSideBar";
import SidebarDialog from "@/Components/Navigation/SidebarDialog/SidebarDialog";
import {Outlet, useRouter} from "@tanstack/react-router";
import {userInitialisedState} from "@/State/state";
import {useRecoilState} from "recoil";
import {OrganizationSwitcher, useAuth, useOrganization, useUser} from "@clerk/clerk-react";
import Logo from '@/Assets/Logo.png'
import {Spinner} from "@/Components/Loading/Spinner";
import {useInitialiseUser} from "@/Hooks/useInitialiseUser";
import {hasRole} from "@/Lib/utils";
import toast from "react-hot-toast";

export default function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const {isSignedIn, isLoaded, userId, signOut} = useAuth();
	const {organization, membership} = useOrganization()
	const router = useRouter();
	const [isUserInitialized, setIsUserInitialized] = useRecoilState(userInitialisedState);
	const {user} = useUser();
	const {initialiseUser} = useInitialiseUser();
	useEffect(() => {
		console.log('running')
		if (isLoaded && (!user?.publicMetadata.varify_initialised || !isUserInitialized)) {
			console.log('initialising user')
			initialiseUser()
		}
	}, [userId, isLoaded, organization, user?.publicMetadata.varify_initialised, isUserInitialized])

	useEffect(() => {
		if (isSignedIn && hasRole(membership?.role, 'org:member')) {
			toast.error('You do not have permissions to view the dashboard. Please contact your organisation admin', {duration: 10000})
			signOut()
		}
	}, [organization, membership]);

	useEffect(() => {
		if (!isSignedIn && isLoaded) {
			router.navigate({to: "/login"});
		}
	}, [isSignedIn]);

	if (isSignedIn && !organization?.publicMetadata.varify_access) {
		return (
			<div className="flex bg-white justify-center items-center h-screen flex-col space-y-6">
				<img src={Logo} alt={''} className={'h-16'}/>
				<OrganizationSwitcher/>
				<h1 className="text-xl font-semibold text-primary">You or your current
					organisation does not have access to this product</h1>
				<p className="text-primary">Please contact your organisation's admin or the owner of
					this product to get access</p>
				<p>Or purchase a subscription at <a className={'text-indigo-600 font-semibold'}
													href="https://synex.one">Synex.com</a></p>
			</div>
		)
	}


	if (!isUserInitialized) {
		return (
			<div className="flex bg-white justify-center items-center h-screen flex-col space-y-6">
				<img src={Logo} alt={''} className={'h-16'}/>
				<Spinner/>
			</div>
		)
	}

	return (
		<>
			<StickyTopMobileSideBar setOpen={setSidebarOpen}/>
			<SidebarDialog sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
			<div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col w-60`}>
				<SideBar/>
			</div>
			<main className={"lg:ml-60 flex-grow flex flex-col"}>
				<div className="p-10 flex flex-col min-h-screen bg-primary-foreground">
					<Outlet/>
				</div>
			</main>
		</>
	);
}
