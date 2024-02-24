import {OrganizationProfile, useAuth, UserProfile} from "@clerk/clerk-react";
import React from "react";
import {hasRole} from "@/Lib/utils";

export default function SettingsPage() {
	const {orgRole} = useAuth();
	return (
		<div className={'space-y-24'}>
			{hasRole(orgRole, 'org:admin') && (
				<div className={"space-y-6"}>
					<h1 className={'text-2xl font-semibold'}>Organisation Settings</h1>
					<OrganizationProfile/>
				</div>
			)}
			<div className={"space-y-6"}>
				<h1 className={'text-2xl font-semibold'}>User Account Settings</h1>
				<UserProfile/>
			</div>
		</div>
	)
}
