import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Job} from "../../job/entities/job.entity";

@ObjectType()
export class Project {
    @Field(() => String)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    customer: string;

    @Field(() => String)
    status: ProjectStatus;

    @Field(() => String)
    organisationId: string;

    @Field(() => [Job], {nullable: true})
    jobs: Job[];

    @Field(() => String)
    createdAt: string;

    @Field(() => String)
    updatedAt: string;
}

export enum ProjectStatus {
    UPCOMING = 'UPCOMING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ARCHIVED = 'ARCHIVED',
}
