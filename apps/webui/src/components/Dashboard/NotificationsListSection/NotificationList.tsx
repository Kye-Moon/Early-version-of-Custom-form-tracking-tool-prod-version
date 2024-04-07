import {Table, TableBody, TableCaption, TableCell, TableRow,} from "@/Primitives/Table";
import React from "react";
import Badge from "@/Primitives/Badge/Badge";
import {DashboardSearchVariationsQuery} from "gql-types";
import TableEmptyState from "@/Components/TableEmptyState";
import {enumToSentenceCase} from "@/Lib/utils";
import {Link} from "@tanstack/react-router";
import {useSuspenseQuery} from "@apollo/client";
import {dashboardNotificationsQuery} from "@/Services/variationService";
import {getBadgeVariant} from "@/Lib/badgeUtils";

interface NotificationListProps {
	notifications: DashboardSearchVariationsQuery["searchJobRecords"];
}

export default function NotificationList() {
	const {data} = useSuspenseQuery(dashboardNotificationsQuery, {variables: {input: {limit: 10}}})
	const notifications = data?.searchJobRecords ?? []
	return (
		<div className="overflow-hidden  ">
			{notifications.length === 0 && (
				<TableEmptyState className={'p-6'} mainText={"No notifications found"}/>)}
			{notifications.length > 0 && (
				<Table>
					<TableCaption>Notifications</TableCaption>
					<TableBody>
						{notifications.map((notification: DashboardSearchVariationsQuery["searchJobRecords"][0]) => (
							<TableRow key={notification.id}>
								<TableCell className="font-medium rounded-lg">
									<Link
										to={'/job-records/$jobRecordId/edit'}
										params={{jobRecordId: notification.id}} search={''}>
										<NotificationCell notification={notification}/>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

const NotificationCell = ({notification}: {
	notification: DashboardSearchVariationsQuery["searchJobRecords"][0]
}) => {
	return (
		<div className="flex space-x-3 cursor-pointer">
			<div className="max-w-xs space-y-1">
				<p className="font-medium text-gray-900 truncate">{notification.title}</p>
				<p className="text-xs text-gray-500 ">
					{notification?.description && notification?.description.length > 100
						? notification?.description.substring(0, 100) + "..."
						: notification.description}
				</p>
				<p className="text-xs text-gray-300  truncate">Submitted by
					- {notification.submittedBy.name}</p>
			</div>
			<div className={'s'}>
				<Badge text={enumToSentenceCase(notification.type) ?? "-"} size={"sm"}
					   variant={getBadgeVariant(notification.type)}/>
				{notification.flag && (
					<Badge text={enumToSentenceCase(notification.flag)} size={"sm"}
						   variant={getBadgeVariant(notification.flag)}/>)}
			</div>
		</div>
	);
};

interface Notification {
	id: string;
	type: string;
	title: string;
	description: string;
	submittedBy: string;
	submittedAt: string;
}
