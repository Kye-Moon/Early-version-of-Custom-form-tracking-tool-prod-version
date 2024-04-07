import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateFormTemplateInput {
    @Field(() => String)
    name: string;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => String)
    category: string;
}
