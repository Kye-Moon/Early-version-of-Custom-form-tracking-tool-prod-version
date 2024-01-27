import {Field, InputType} from '@nestjs/graphql';
import {VariationResourceType} from "../entities/variation-resource.entity";

@InputType()
export class CreateVariationResourceInput {
    @Field(() => String, {nullable: true})
    id?: string;

    @Field(() => String)
    jobRecordId: string;

    @Field(() => String)
    type: VariationResourceType;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => String, {nullable: true})
    quantity?: string;

    @Field(() => String, {nullable: true})
    unit?: string;

    @Field(() => String, {nullable: true})
    unitPrice?: string;

    @Field(() => String, {nullable: true})
    hours?: string;

    @Field(() => String, {nullable: true})
    rate?: string;

    @Field(() => String, {nullable: true})
    numPeople?: string;
}
