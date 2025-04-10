import React, {useEffect, useState} from "react";
import SideBar from "@/Components/Navigation/SideBar/SideBar";
import StickyTopMobileSideBar
	from "@/Components/Navigation/StickyTopMobileSideBar/StickyTopMobileSideBar";
import SidebarDialog from "@/Components/Navigation/SidebarDialog/SidebarDialog";
import {Outlet, useRouter} from "@tanstack/react-router";
import {useAuth, useOrganization, useUser} from "@clerk/clerk-react";

export default function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const {isSignedIn, isLoaded, userId, signOut} = useAuth();
	const {organization, membership, membershipList} = useOrganization()
	const router = useRouter();
	const {user} = useUser();

	useEffect(() => {
		if (!isSignedIn && isLoaded) {
			router.navigate({to: "/login"});
		}
	}, [isSignedIn]);


	return (
		<>
			<StickyTopMobileSideBar setOpen={setSidebarOpen}/>
			<SidebarDialog sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
			<div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col w-72`}>
				<SideBar/>
			</div>
			<main className={"lg:ml-72 flex-grow flex flex-col"}>
				<div className="p-10 flex flex-col min-h-screen bg-primary-foreground">
					<Outlet/>
				</div>
			</main>
		</>
	);
}
