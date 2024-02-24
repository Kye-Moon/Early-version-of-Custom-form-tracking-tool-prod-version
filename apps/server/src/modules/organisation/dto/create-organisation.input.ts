import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateOrganisationInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    authId: string;

    @Field(() => String, {nullable: true})
    logoUrl?: string;
}
