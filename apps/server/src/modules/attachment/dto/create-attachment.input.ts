import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateAttachmentsInput {
    @Field(() => String)
    referenceId: string;

    @Field(() => [AttachmentsInput])
    attachments: AttachmentsInput[];

    @Field(() => String)
    referenceType: "JOB" | "PROJECT";
}

@InputType()
export class AttachmentsInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    url: string;

    @Field(() => String)
    type: string;
}