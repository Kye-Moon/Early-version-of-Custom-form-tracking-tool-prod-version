import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Attachment {
    @Field(() => String)
    id: string;

    @Field(() => String)
    referenceId: string;

    @Field(() => String)
    referenceType: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    url: string;

    @Field(() => String)
    type: string;

    @Field(() => String)
    createdAt: string;

    @Field(() => String)
    updatedAt: string;
}
