import {InputType, Int, Field} from '@nestjs/graphql';

@InputType()
export class CreateJobScopeItemInput {
    @Field(() => String, {nullable: true})
    id: string;

    @Field(() => String)
    jobId: string;

    @Field(() => String, {nullable: true})
    reference: string;

    @Field(() => String, {nullable: true})
    title: string;

    @Field(() => String, {nullable: true})
    description: string;
}

@InputType()
export class CreateJobScopeItemViaJobInput {

    @Field(() => String, {nullable: true})
    reference: string;

    @Field(() => String, {nullable: true})
    title: string;

    @Field(() => String, {nullable: true})
    description: string;
}

