import {InputType, Field} from '@nestjs/graphql';
import {BaseSearchInput} from '../../../common/base/base.searchInput';
import {JobStatus} from '../entities/job.entity';

@InputType()
export class JobSearchInput extends BaseSearchInput {
    @Field(() => String, {nullable: true})
    customer: string;

    @Field(() => String, {nullable: true})
    status: JobStatus;

    @Field(() => String, {nullable: true})
    projectId: string;

    @Field(() => String, {nullable: true})
    title: string;
}
