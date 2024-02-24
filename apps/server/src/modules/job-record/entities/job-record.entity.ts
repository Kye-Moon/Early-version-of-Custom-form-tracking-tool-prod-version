import {Field, ObjectType} from '@nestjs/graphql';
import {Job} from "../../job/entities/job.entity";
import {User} from "../../user/entities/user.entity";
import {VariationInitialData} from "../../variation-initial-data/entities/variation-initial-data.entity";
import {JobRecordImage} from "../../job-record-image/entities/job-record-image.entity";
import {JobScopeItem} from "../../job-scope-item/entities/job-scope-item.entity";

@ObjectType()
export class JobRecord {
    @Field(() => String)
    id: string;

    @Field(() => String)
    title: string

    @Field(() => String, {nullable: true})
    scopeRef?: string

    @Field(() => String, {nullable: true})
    description?: string

    @Field(() => String)
    type: JobRecordType

    @Field(() => String, {nullable: true})
    status?: JobRecordStatus

    @Field(() => String)
    jobId: string

    @Field(() => String, {nullable: true})
    flag?: JobRecordFlag

    @Field(() => Job)
    job: Job

    @Field(() => User)
    submittedBy: User

    @Field(() => VariationInitialData, {nullable: true})
    initialData: VariationInitialData

    @Field(() => [JobRecordImage])
    images: JobRecordImage[]

    @Field(() => JobScopeItem, {nullable: true})
    scopeItem: JobScopeItem

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

export enum JobRecordType {
    VARIATION = 'VARIATION',
    NOTE = 'NOTE',
    QA = 'QA',
    SAFETY = 'SAFETY',
    CREW_LOG = 'CREW_LOG',
}

export enum JobRecordFlag {
    POTENTIAL = 'POTENTIAL',
    CONFIRMED = 'CONFIRMED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    HIGH_RISK = 'HIGH_RISK',
    MEDIUM_RISK = 'MEDIUM_RISK',
    LOW_RISK = 'LOW_RISK',
}

export enum JobRecordStatus {
    IN_REVIEW = 'IN_REVIEW',
    SUBMITTED = 'SUBMITTED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    NO_ACTION = 'NO_ACTION',
    ARCHIVED = 'ARCHIVED',
}
