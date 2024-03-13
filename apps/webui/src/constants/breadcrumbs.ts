export const getJobPageBreadCrumb = ({jobRecordId}: {
	jobRecordId?: string
}) => {
	return [
		{name: 'Jobs', href: '/jobs', current: false},
		{name: "Job Record", href: `/job-records/${jobRecordId}/edit`, current: true},
	]
}


export const getJobPageBreadCrumbWithJobName = (jobRecordId?: string, jobName?: string) => {
	return [
		{name: 'Jobs', href: '/job-records', current: false},
	]
}
