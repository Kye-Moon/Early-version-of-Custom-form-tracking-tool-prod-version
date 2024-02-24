import {Field, ObjectType} from '@nestjs/graphql';
import {UserOrganisation} from "../../user-organisation/entities/user-organisation.entity";

@ObjectType()
export class JobCrewMember {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String, {nullable: true})
    phone: string;

    @Field(() => UserOrganisation, {nullable: true})
    userOrganisation?: UserOrganisation;
}
