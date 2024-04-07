import {ObjectType, Field,} from '@nestjs/graphql';
import {GraphQLJSONObject} from 'graphql-type-json';

@ObjectType()
export class FormTemplate {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => String)
    category: string;

    @Field(() => String, {nullable: true})
    organizationId?: string;

    @Field(() => Boolean, {nullable: true})
    autoAssign?: boolean;

    @Field(() => GraphQLJSONObject, {nullable: true})
    structure?: JSON;

    @Field(() => String, {nullable: true})
    status?: "ACTIVE" | "PENDING" | "ARCHIVED";

    @Field(() => Boolean, {nullable: true})
    isSystemDefault: boolean;
}
