import {InputType, Int, Field} from '@nestjs/graphql';
import {ProjectStatus} from "../entities/project.entity";

@InputType()
export class CreateProjectInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    customer: string;

    @Field(() => String)
    status: ProjectStatus;
}


