import {OrganizationProfile, useAuth, UserProfile} from "@clerk/clerk-react";
import React from "react";
import {hasOrgRole} from "@/Lib/utils";

export default function SettingsPage() {
	const {orgRole} = useAuth();
	return (
		<div className={'space-y-24'}>
			<div className={"space-y-6"}>
				<h1 className={'text-2xl font-semibold'}>User Account Settings</h1>
				<UserProfile/>
			</div>
			{hasOrgRole(orgRole, 'org:admin') && (
				<div className={"space-y-6"}>
					<h1 className={'text-2xl font-semibold'}>Organisation Settings</h1>
					<OrganizationProfile/>
				</div>
			)}
		</div>
	)
}
