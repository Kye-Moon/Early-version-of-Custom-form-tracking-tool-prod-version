import {Field, InputType} from "@nestjs/graphql";
import {BaseSearchInput} from "../../../common/base/base.searchInput";

@InputType()
export class JobRecordSearchInput extends BaseSearchInput {

    @Field(() => String, {nullable: true})
    jobId?: string;

    @Field(() => String, {nullable: true})
    filter?: string;

    @Field(() => Boolean, {nullable: true})
    archivedOnly?: boolean;
}