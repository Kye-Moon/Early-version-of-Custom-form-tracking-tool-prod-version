import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    role: string;

    @Field(() => String)
    authId: string;
}
