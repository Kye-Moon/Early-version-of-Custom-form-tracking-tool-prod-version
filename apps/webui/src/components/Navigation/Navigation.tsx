import {HomeIcon} from "@heroicons/react/24/outline";
import {BriefcaseIcon, FileTextIcon, HardHat, UsersIcon} from "lucide-react";

export interface NavigationItemProps {
	label: string;
	icon: any;
	route: string;
}

export const sideBarMenuItems: NavigationItemProps[] = [
	{label: "Dashboard", route: "/dashboard", icon: HomeIcon},
	{label: "Projects", route: "/projects", icon: BriefcaseIcon},
	{label: "Jobs", route: "/jobs", icon: HardHat},
	{label: "Job Records", route: "/job-records", icon: FileTextIcon},
];

export const adminMenuItems: NavigationItemProps[] = [
	{label: "Organisation Users", route: "/organisation-users", icon: UsersIcon},
]
