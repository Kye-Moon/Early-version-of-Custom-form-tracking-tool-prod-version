import {Field, InputType} from '@nestjs/graphql';
import {FormTemplateStatus} from "../entities/form-template.entity";


@InputType()
export class SearchFormTemplateInput {
    @Field(() => String, {nullable: true})
    category?: string;

    @Field(() => String, {nullable: true})
    jobId?: string;

    @Field(() => [String], {nullable: true})
    includeStatuses?: FormTemplateStatus[];

    @Field(() => String, {nullable: true})
    organisationId?: string;
}
