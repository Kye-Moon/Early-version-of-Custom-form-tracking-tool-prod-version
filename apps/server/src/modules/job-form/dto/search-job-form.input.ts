import {Field, InputType} from '@nestjs/graphql';
import {FormTemplateStatus} from "../../form-template/entities/form-template.entity";


@InputType()
export class SearchJobFormInput {

    @Field(() => String, {nullable: true})
    jobId?: string;

    @Field(() => [String], {nullable: true})
    includeStatuses?: FormTemplateStatus[];

    @Field(() => String, {nullable: true})
    organisationId?: string;
}
