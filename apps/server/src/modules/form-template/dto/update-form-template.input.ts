import {CreateFormTemplateInput} from './create-form-template.input';
import {InputType, Field, Int, PartialType} from '@nestjs/graphql';
import {GraphQLJSONObject} from 'graphql-type-json';

@InputType()
export class UpdateFormTemplateInput extends PartialType(CreateFormTemplateInput) {
    @Field(() => String)
    id: string;

    @Field(() => Boolean, {nullable: true})
    autoAssign?: boolean;

    @Field(() => GraphQLJSONObject, {nullable: true})
    structure?: JSON;

    @Field(() => String, {nullable: true})
    status?: "ACTIVE" | "PENDING" | "ARCHIVED";

    @Field(() => Boolean, {nullable: true})
    isSystemDefault: boolean;
}
