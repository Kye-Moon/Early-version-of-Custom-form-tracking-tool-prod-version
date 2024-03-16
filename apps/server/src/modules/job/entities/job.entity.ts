import {Field, ObjectType} from '@nestjs/graphql';
import {JobRecord} from "../../job-record/entities/job-record.entity";
import {JobScopeItem} from "../../job-scope-item/entities/job-scope-item.entity";

@ObjectType()
export class Job {
    @Field(() => String)
    id: string;

    @Field(() => String, {nullable: true})
    title: string;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => String, {nullable: true})
    customerName: string;

    @Field(() => String, {nullable: true})
    status: JobStatus;

    @Field(() => String, {nullable: true})
    ownerId: string;

    @Field(() => String, {nullable: true})
    organisationId: string;

    @Field(() => Date, {nullable: true})
    dueDate: Date;

    @Field(() => Date, {nullable: true})
    createdAt: Date = new Date();

    @Field(() => Date, {nullable: true})
    updatedAt = new Date();

    @Field(() => [JobRecord], {nullable: true})
    variations: JobRecord[];

    @Field(() => [JobScopeItem], {nullable: true})
    scopeItems: JobScopeItem[];
}

export enum JobStatus {
    UPCOMING = 'UPCOMING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ARCHIVED = 'ARCHIVED',
}
