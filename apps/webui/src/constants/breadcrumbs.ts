export const getJobPageBreadCrumb = ({jobRecordId}: {
	jobRecordId?: string
}) => {
	return [
		{name: 'Jobs', href: '/jobs', current: false},
		{name: "Job Record", href: `/job-records/${jobRecordId}/edit`, current: true},
	]
}


export const getJobPageBreadCrumbWithJobName = () => {
	return [
		{name: 'Jobs', href: '/jobs', current: false},
	]
}

export const getEditJobPageBreadCrumb = ({jobId}: {
	jobId?: string
}) => {
	return [
		{name: 'Jobs', href: '/jobs', current: false},
		{name: "Job", href: `/jobs/${jobId}`, current: false},
		{name: "Edit", href: `/jobs/${jobId}/edit`, current: true},
	]
}

export const getEditProjectPageBreadCrumb = ({projectId}: {
	projectId?: string
}) => {
	return [
		{name: 'Projects', href: '/projects', current: false},
		{name: "Project", href: `/projects/${projectId}`, current: false},
		{name: "Edit", href: `/projects/${projectId}/edit`, current: true},
	]
}

export const getViewProjectPageBreadCrumb = ({projectId}: {
	projectId?: string
}) => {
	return [
		{name: 'Projects', href: '/projects', current: false},
		{name: "Project", href: `/projects/${projectId}`, current: true},
	]
}

export const getEditRecordTemplatesPageBreadCrumb = ({templateId}: {
	templateId?: string
}) => {
	return [
		{name: 'Record Templates', href: '/record-templates', current: false},
		{name: "Edit", href: `/record-templates/${templateId}/edit`, current: true},
	]
}
