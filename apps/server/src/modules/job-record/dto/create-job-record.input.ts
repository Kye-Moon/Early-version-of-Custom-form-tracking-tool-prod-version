import {Field, InputType} from '@nestjs/graphql';
import GraphQLJSONObject from 'graphql-type-json';

@InputType()
export class CreateJobRecordInput {
    @Field(() => String)
    jobId: string

    @Field(() => String, {nullable: true})
    scopeRef?: string

    @Field(() => String, {nullable: true})
    title: string

    @Field(() => String, {nullable: true})
    description: string

    @Field(() => String, {nullable: true})
    formId: string

    @Field(() => Boolean)
    archived: boolean

    @Field(() => GraphQLJSONObject, {nullable: true})
    formContent?: JSON

    @Field(() => [String], {nullable: true})
    imageUrls?: string[]
}