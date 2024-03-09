export const getJobPageBreadCrumb = ({jobId, jobRecordId}: {
	jobId?: string,
	jobRecordId?: string
}) => {
	return [
		{name: 'Jobs', href: '/jobs', current: false},
		{name: "Job", href: `/jobs/${jobId}`, current: false},
		{name: "Job Record", href: `/job-records/${jobRecordId}/edit`, current: true},
	]
}


export const getJobPageBreadCrumbWithJobName = (jobRecordId?: string, jobName?: string) => {
	return [
		{name: 'Jobs', href: '/job-records', current: false},
	]
}
