import React, {createContext, useEffect, useState} from "react";
import {useQuery, useSuspenseQuery} from "@apollo/client";
import {jobRecordsTableQuery} from "@/Services/variationService";
import {
	FindAllProjectsQuery,
	graphql,
	JobRecordTableSearchQuery,
	JobsTableSearchJobsQuery
} from "gql-types";
import {jobTableSearchJobs} from "@/Services/jobService";
import {finaAllProjects} from "@/Services/projectService";

interface JobSearchContext {
	name: string;
	setName: (name: string) => void;
	customer: string;
	setCustomer: (customer: string) => void;
	status: string;
	setStatus: (status: string) => void;
	projectId: string
	setProjectId: (project: string) => void;
	submittedBy: string;
	setSubmittedBy: (submittedBy: string) => void;
	clearAll: () => void;
	data: JobsTableSearchJobsQuery | undefined
	loading: boolean
	projects: { label: string, value: string }[]
}

export const JobSearchContext = createContext<JobSearchContext | undefined>(undefined);

interface JobSearchProviderProps {
	children: React.ReactNode;
	defaultProjectId?: string;
}

export default function JobSearchProvider({
											  children,
											  defaultProjectId
										  }: JobSearchProviderProps): React.ReactNode {
	const [name, setName] = useState<string>('');
	const [customer, setCustomer] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const [submittedBy, setSubmittedBy] = useState<string>('');
	const [projectId, setProjectId] = useState<string>(defaultProjectId || '');

	const {data, loading} = useQuery(jobTableSearchJobs, {
		variables: {
			input: {
				...(name && {title: name}),
				...(submittedBy && {submittedBy: submittedBy}),
				...(customer && {customer: customer}),
				...(status && {status: status}),
				...(projectId && {projectId: projectId}),
			}
		},
	})
	const {data: projects, loading: projectsLoading} = useQuery(finaAllProjects);


	const clearAll = () => {
		setName('');
		setSubmittedBy('');
		setCustomer('');
		setStatus('');
		setProjectId('');
	}

	return (
		<JobSearchContext.Provider value={{
			name,
			setName,
			submittedBy,
			setSubmittedBy,
			clearAll,
			data,
			loading: loading || projectsLoading,
			customer,
			setCustomer,
			status,
			setStatus,
			projectId,
			setProjectId,
			projects: projects?.projects?.map((proj: FindAllProjectsQuery['projects'][0]) => ({
				value: proj.id,
				label: proj.title
			})) || []
		}}>
			{children}
		</JobSearchContext.Provider>
	);
}

export function useJobSearch() {
	const context = React.useContext(JobSearchContext);
	if (context === undefined) {
		throw new Error("useJobRecordSearch must be used within a JobRecordSearchProvider");
	}
	return context;
}
