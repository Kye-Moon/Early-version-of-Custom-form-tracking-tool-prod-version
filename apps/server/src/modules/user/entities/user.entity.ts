import {Field, ObjectType} from '@nestjs/graphql';
import {Organisation} from "../../organisation/entities/organisation.entity";
import {UserOrganisation} from "../../user-organisation/entities/user-organisation.entity";


export type UserStatus = "ACTIVE" | "INVITED" | "DEACTIVATED"

@ObjectType()
export class User {
    @Field(() => String)
    id: string;

    @Field(() => String,{nullable: true})
    phone?: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    authId: string;

    @Field(() => String)
    email: string;

    @Field(() => Organisation, {nullable: true})
    organisation?: Organisation;

    @Field(() => UserOrganisation, {nullable: true})
    userOrganisation?: UserOrganisation;

    @Field(() => Date)
    createdAt: Date = new Date();

    @Field(() => Date)
    updatedAt = new Date();
}
