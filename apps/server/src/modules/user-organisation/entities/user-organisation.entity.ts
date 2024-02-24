import {Field, ObjectType} from '@nestjs/graphql';
import {Organisation} from "../../organisation/entities/organisation.entity";
import {User} from "../../user/entities/user.entity";

@ObjectType()
export class UserOrganisation {
    @Field(() => String)
    id: string;

    @Field(() => String)
    userId: string;

    @Field(() => String)
    organisationId: string;

    @Field(() => String)
    role: string;

    @Field(() => Organisation)
    organisation?: Organisation;

    @Field(() => User)
    user?: User;

    @Field(() => Date)
    createdAt: Date = new Date();

    @Field(() => Date)
    updatedAt = new Date();
}
