import {DropSelectOption} from "@/Components/DropSelect/DropSelect";

export enum JobStatus {
    UPCOMING = "UPCOMING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ARCHIVED = "ARCHIVED",
}

export const JobStatusSelectOptions: DropSelectOption[] = [
    {
        label: "Upcoming",
        value: JobStatus.UPCOMING
    },
    {
        label: "In progress",
        value: JobStatus.IN_PROGRESS
    },
    {
        label: "Completed",
        value: JobStatus.COMPLETED
    },
    {
        label: "Archived",
        value: JobStatus.ARCHIVED
    },
];


export const roleSelectOptions: DropSelectOption[] = [
    {
        label: "Member",
        value: "org:member",
    },
];

export const jobRecordTyoeSelectOptions: DropSelectOption[] = [
    {
        label: "Variation",
        value: "VARIATION",
    },
    {
        label: "Note",
        value: "NOTE",
    },
    {
        label: "QA",
        value: "QA",
    },
    {
        label: "Safety",
        value: "SAFETY",
    }
];

export const variationStatusSelectOptions: DropSelectOption[] = [
    {
        label: "In review",
        value: "IN_REVIEW",
    },
    {
        label: "Submitted",
        value: "SUBMITTED",
    },
    {
        label: "Approved",
        value: "APPROVED",
    },
    {
        label: "Rejected",
        value: "REJECTED",
    },
    {
        label: "No action",
        value: "NO_ACTION",
    },
    {
        label: "Archived",
        value: "ARCHIVED",
    },
];

export const variationFlagSelectOptions: DropSelectOption[] = [
    {
        label: "Potential",
        value: "POTENTIAL",
    },
    {
        label: "Confirmed",
        value: "CONFIRMED",
    },
    {
        label: "In progress",
        value: "IN_PROGRESS",
    },
    {
        label: "Completed",
        value: "COMPLETED",
    },
];

export const jobRecordFlagSelectOptions: DropSelectOption[] = [
    {
        label: "High risk",
        value: "HIGH_RISK",
    },
    {
        label: "Medium risk",
        value: "MEDIUM_RISK",
    },
    {
        label: "Low risk",
        value: "LOW_RISK",
    },
];

