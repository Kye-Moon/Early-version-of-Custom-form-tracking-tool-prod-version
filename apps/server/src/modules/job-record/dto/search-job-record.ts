import {Field, InputType} from "@nestjs/graphql";
import {BaseSearchInput} from "../../../common/base/base.searchInput";

@InputType()
export class JobRecordSearchInput extends BaseSearchInput {

    @Field(() => String, {nullable: true})
    jobId?: string;

    @Field(() => String, {nullable: true})
    title?: string;

    @Field(() => String, {nullable: true})
    formId?: string;

    @Field(() => String, {nullable: true})
    formCategory?: string;

    @Field(() => String, {nullable: true})
    submittedBy?: string;

    @Field(() => Boolean, {nullable: true})
    archivedOnly?: boolean;
}