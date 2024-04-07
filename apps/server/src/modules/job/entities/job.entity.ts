import {Field, ObjectType} from '@nestjs/graphql';
import {JobRecord} from "../../job-record/entities/job-record.entity";
import {JobScopeItem} from "../../job-scope-item/entities/job-scope-item.entity";
import {Project} from "../../project/entities/project.entity";
import {FormTemplate} from "../../form-template/entities/form-template.entity";

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

    @Field(() => String, {nullable: true})
    projectId: string;

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

    @Field(() => Project, {nullable: true})
    project: Project;

    @Field(() => [FormTemplate], {nullable: true})
    jobForms: FormTemplate[];
}

export enum JobStatus {
    UPCOMING = 'UPCOMING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ARCHIVED = 'ARCHIVED',
}
