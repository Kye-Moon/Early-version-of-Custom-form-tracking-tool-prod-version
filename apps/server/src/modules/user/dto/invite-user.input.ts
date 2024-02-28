import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class InviteUserInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    role: string;
}
