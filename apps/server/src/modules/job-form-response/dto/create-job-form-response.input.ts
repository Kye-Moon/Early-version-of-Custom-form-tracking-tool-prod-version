import {InputType, Int, Field} from '@nestjs/graphql';
import GraphQLJSONObject     from "graphql-type-json";

@InputType()
export class CreateJobFormResponseInput {

    @Field(() => String)
    jobFormId: string;

    @Field(() => String)
    jobRecordId: string;

    @Field(() => GraphQLJSONObject)
    response: JSON;
}
