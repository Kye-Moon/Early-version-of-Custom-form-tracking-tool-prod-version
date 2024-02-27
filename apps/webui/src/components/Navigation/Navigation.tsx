import {HomeIcon} from "@heroicons/react/24/outline";
import {BriefcaseIcon, FileTextIcon, UserCogIcon, UsersIcon} from "lucide-react";

export interface NavigationItemProps {
	label: string;
	icon: any;
	route: string;
}

export const sideBarMenuItems: NavigationItemProps[] = [
	{label: "Dashboard", route: "/dashboard", icon: HomeIcon},
	{label: "Jobs", route: "/jobs", icon: BriefcaseIcon},
	{label: "Job Records", route: "/job-records", icon: FileTextIcon},
];

export const adminMenuItems: NavigationItemProps[] = [
	{label: "Organisation Users", route: "/organisation-users", icon: UsersIcon},
]
