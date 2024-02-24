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
    {label: "Organisation Users", route: "/organisation-users", icon: UsersIcon},
];

export const adminMenuItems: NavigationItemProps[] = [
    {label: "Admins", route: '/admins', icon: UserCogIcon}
]
