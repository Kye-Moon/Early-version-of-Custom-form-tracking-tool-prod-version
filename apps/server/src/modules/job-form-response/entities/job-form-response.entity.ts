import {ObjectType, Field, Int} from '@nestjs/graphql';
import GraphQLJSONObject from "graphql-type-json";

@ObjectType()
export class JobFormResponse {
    @Field(() => String)
    id: string;

    @Field(() => String)
    jobFormId: string;

    @Field(() => String)
    jobRecordId: string;

    @Field(() => GraphQLJSONObject, {nullable: true})
    response?: JSON;
}
