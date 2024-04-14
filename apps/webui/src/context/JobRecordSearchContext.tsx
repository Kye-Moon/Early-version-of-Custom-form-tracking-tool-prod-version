import React, {createContext, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {jobRecordsTableQuery} from "@/Services/variationService";
import {graphql, JobRecordTableSearchQuery} from "gql-types";

interface JobRecordSearchContext {
	name: string;
	setName: (name: string) => void;
	jobId: string;
	setJobId: (jobId: string) => void;
	formId: string
	setFormId: (form: string) => void;
	formCategory: string
	setFormCategory: (formCategory: string) => void;
	submittedBy: string;
	setSubmittedBy: (submittedBy: string) => void;
	clearAll: () => void;
	data: JobRecordTableSearchQuery | undefined
	loading: boolean
	categories: { label: string, value: string }[]
	forms: { label: string, value: string }[]
}

const formSelectQuery = graphql(`
	query OrganisationFormSelect {
		formTemplates {
			id
			name
			category
		}
	}
`)
export const JobRecordSearchContext = createContext<JobRecordSearchContext | undefined>(undefined);

interface JobRecordSearchProviderProps {
	children: React.ReactNode;
	defaultJobId?: string;
}

export default function JobRecordSearchProvider({
													children,
													defaultJobId
												}: JobRecordSearchProviderProps): React.ReactNode {
	const [name, setName] = useState<string>('');
	const [jobId, setJobId] = useState<string>(defaultJobId || '');
	const [formId, setFormId] = useState<string>('');
	const [formCategory, setFormCategory] = useState<string>('');
	const [submittedBy, setSubmittedBy] = useState<string>('');
	const [categories, setCategories] = useState<{ label: string, value: string }[]>([])
	const [forms, setForms] = useState<{ label: string, value: string }[]>([])

	const {data, loading} = useQuery(jobRecordsTableQuery, {
		variables: {
			input: {
				...(jobId && {jobId: jobId}),
				...(name && {title: name}),
				...(formId && {formId: formId}),
				...(formCategory && {formCategory: formCategory}),
				...(submittedBy && {submittedBy: submittedBy}),
			}
		},
	})

	const {data: orgForms, loading: orgFormsLoading} = useQuery(formSelectQuery)

	useEffect(() => {
		const categories = orgForms?.formTemplates?.slice()
			.filter((form, index, self) =>
				index === self.findIndex((t) => t.category === form.category))
			.sort((a, b) => a.category.localeCompare(b.category))
			.map((form) => ({
				label: form.category,
				value: form.category
			})) || []
		setCategories(categories || [])

		const forms = orgForms?.formTemplates?.slice()
			.filter((form, index, self) =>
				index === self.findIndex((t) => t.id === form.id))
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((form) => ({
				label: form.name,
				value: form.id
			})) || []
		setForms(forms || [])
	}, [orgForms])

	const clearAll = () => {
		setName('');
		setJobId('');
		setFormId('');
		setFormCategory('');
		setSubmittedBy('');
	}

	return (
		<JobRecordSearchContext.Provider value={{
			name,
			setName,
			jobId,
			setJobId,
			formId,
			setFormId,
			formCategory,
			setFormCategory,
			submittedBy,
			setSubmittedBy,
			clearAll,
			data,
			loading: loading || orgFormsLoading,
			categories,
			forms
		}}>
			{children}
		</JobRecordSearchContext.Provider>
	);
}

export function useJobRecordSearch() {
	const context = React.useContext(JobRecordSearchContext);
	if (context === undefined) {
		throw new Error("useJobRecordSearch must be used within a JobRecordSearchProvider");
	}
	return context;
}
