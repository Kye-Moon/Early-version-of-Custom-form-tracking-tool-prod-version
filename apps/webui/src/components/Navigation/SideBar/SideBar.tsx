import {SideBarPrimaryMenuItem} from "@/Components/Navigation/SideBar/SideBarPrimaryMenuItem";
import {adminMenuItems, sideBarMenuItems} from "@/Components/Navigation/Navigation";
import React from "react";
import {Separator} from "@/Primitives/Seperator";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {tokenState, userInitialisedState, userState} from "../../../state/state";
import {hasRole} from "@/Lib/utils";
import {LogOutIcon, SettingsIcon} from "lucide-react";
import {useRouter} from "@tanstack/react-router";
import Logo from "@/Assets/Logo.png";
import {OrganizationSwitcher, useAuth} from "@clerk/clerk-react";

export default function SideBar() {
	const userInfo = useRecoilValue(userState);
	const {signOut} = useAuth();
	const setUserInitialised = useSetRecoilState(userInitialisedState);
	const handleLogout = async () => {
		setUserInitialised(false)
		await signOut()
	}

	return (
		<div className="flex bg-white shadow grow flex-col gap-y-5 overflow-y-auto px-6 pb-2">
			<div className="flex space-x-4 pt-4">
				<img
					className="h-8  mt-1"
					src={Logo}
					alt="Your Company"
				/>
			</div>
			<OrganizationSwitcher hidePersonal={true}/>
			<Separator/>
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" className="-mx-2 space-y-6">
							{sideBarMenuItems.map((item) => (
								<SideBarPrimaryMenuItem key={item.label} item={item}/>
							))}
						</ul>
						{hasRole(userInfo, 'OWNER') && (
							<>
								<Separator className={'my-2'}/>
								<ul role="list" className="-mx-2 space-y-6">
									{adminMenuItems.map((item) => (
										<SideBarPrimaryMenuItem key={item.label} item={item}/>
									))}
								</ul>
							</>
						)}
					</li>
				</ul>
				<ul className={'mb-4 -mx-2'}>
					<SideBarPrimaryMenuItem key={"settings"} item={{
						label: "Settings",
						route: '/settings',
						icon: SettingsIcon
					}}/>
					<button
						className={'flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-accent  transition-colors'}
						onClick={handleLogout}>
						<LogOutIcon className={"h-6 w-6 shrink-0 group-hover:text-accent"}
									aria-hidden="true"/>
						Logout
					</button>
				</ul>
			</nav>
		</div>
	);
}
