import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class SearchFormTemplateInput {
    @Field(() => String, {nullable: true})
    category?: string;

    @Field(() => String, {nullable: true})
    jobId?: string;
}
