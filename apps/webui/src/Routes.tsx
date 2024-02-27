import {Outlet, RootRoute, Route, Router, useRouter} from "@tanstack/react-router";
import AppLayout from "./pages/layout";
import React from "react";

import "./styles/global.css";
import {DashboardPage} from "@/Pages/DashboardPage/DashboardPage";
import JobsPage from "@/Pages/JobsPage/JobsPage";
import {Toaster} from "react-hot-toast";
import JobPage from "@/Pages/JobPage/JobPage";
import JobRecordsPage from "@/Pages/JobRecordsPage/JobRecordsPage";
import EditJobPage from "@/Pages/EditJobPage/EditJobPage";
import OrganisationUsersPage from "@/Pages/CrewPage/OrganisationUsersPage";
import JobRecordPage from "@/Pages/JobRecordPage.tsx/JobRecordPage";
import ScrollToTop from "./ScrollToTop";
import Login from "@/Pages/LoginPage/LoginPage";
import AdminPage from "@/Pages/AdminPage/AdminPage";
import SettingsPage from "@/Pages/SettingsPage/SettingsPage";
import {useAuth} from "@clerk/clerk-react";

const rootRoute = new RootRoute({
	component: () => (
		<>
			<Toaster/>
			<ScrollToTop/>
			<Outlet/>
		</>
	),
});

function Index() {
	const router = useRouter();
	const {isSignedIn, isLoaded} = useAuth();
	if (!isSignedIn && isLoaded) {
		router.navigate({to: "/login"});
	} else {
		router.navigate({to: "/dashboard"});
	}
	return <div>Redirecting...</div>;
}

function UnAuthenticatedIndex() {
	return (
		<>
			<Toaster/>
			<Outlet/>
		</>
	);
}

const unAuthenticatedLayoutRoute = new Route({
	getParentRoute: () => rootRoute,
	id: "unAuthenticatedLayout",
	component: UnAuthenticatedIndex,
});


const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Index,
});

const loginRoute = new Route({
	getParentRoute: () => unAuthenticatedLayoutRoute,
	path: "/login",
	component: Login,
});


const layoutRoute = new Route({
	getParentRoute: () => rootRoute,
	id: "layout",
	component: AppLayout,
});

const dashboardRoute = new Route({
	getParentRoute: () => layoutRoute,
	path: "dashboard",
	component: DashboardPage,
});

const jobsRoute = new Route({
	getParentRoute: () => layoutRoute,
	path: "jobs",
});

const jobIndexRoute = new Route({
	getParentRoute: () => jobsRoute,
	path: "/",
	component: JobsPage,
});

const jobRoute = new Route({
	getParentRoute: () => jobsRoute,
	path: "$jobId",
	component: JobPage,
});

const editJobRoute = new Route({
	getParentRoute: () => jobsRoute,
	path: "$jobId/edit",
	component: EditJobPage,
});


const jobRecordsRoute = new Route({
	getParentRoute: () => layoutRoute,
	path: "job-records",
});

const variationIndexRoute = new Route({
	getParentRoute: () => jobRecordsRoute,
	path: "/",
	component: JobRecordsPage,
});

const editVariationRoute = new Route({
	getParentRoute: () => jobRecordsRoute,
	path: "$jobRecordId/edit",
	component: JobRecordPage,
});

const crewRoute = new Route({
	getParentRoute: () => layoutRoute,
	path: "/organisation-users",
	component: OrganisationUsersPage,
});

const adminRoute = new Route({
	getParentRoute: () => layoutRoute,
	path: "/admins",
	component: AdminPage,
});
export const settingsRoute = new Route({
	getParentRoute: () => layoutRoute,
	path: "/settings",
	component: SettingsPage,
});


const routeTree = rootRoute.addChildren([
	indexRoute,
	unAuthenticatedLayoutRoute.addChildren([
		loginRoute,
	]),
	layoutRoute.addChildren([
		dashboardRoute,
		jobsRoute.addChildren([jobIndexRoute, jobRoute, editJobRoute]),
		jobRecordsRoute.addChildren([variationIndexRoute, editVariationRoute]),
		crewRoute,
		adminRoute,
		settingsRoute
	]),
]);
const router = new Router({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export {router};
