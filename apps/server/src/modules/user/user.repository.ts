import {Inject, Injectable} from '@nestjs/common';
import {ORM} from '../../drizzle/drizzle.module';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import {
    NewUser,
    Organisation,
    organisation,
    user,
    User,
    UserOrganisation,
    userOrganisation
} from '../../drizzle/schema';
import {and, eq} from 'drizzle-orm';
import {SearchUserInput} from "./dto/search-user.input";

@Injectable()
export class UserRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }


    async createUser(createUserInput: NewUser): Promise<User> {
        const _user = await this.db
            .insert(user)
            .values([createUserInput])
            .returning();
        return _user[0];
    }

    async findOneByAuthId(authId: string): Promise<User> {
        const _user = await this.db
            .select()
            .from(user)
            .where(eq(user.authId, authId));
        return _user[0];
    }

    async findOneById(id: string): Promise<User> {
        const _user = await this.db
            .select()
            .from(user)
            .where(eq(user.id, id));
        return _user[0];
    }


    /**
     * Find all users that belong to an organisation based on search criteria
     * @param searchInput
     */
    async search(searchInput: SearchUserInput): Promise<{
        user: User,
        organisation: Organisation
        user_organisation: UserOrganisation,
    }[]> {
        return await this.db
            .select()
            .from(user)
            .innerJoin(userOrganisation, eq(user.id, userOrganisation.userId))
            .innerJoin(organisation, eq(userOrganisation.organisationId, organisation.id))
            .where(
                and(
                    ...(searchInput.organisationId ? [eq(organisation.id, searchInput.organisationId)] : []),
                )
            );
    }

    async updateUser(id: string, updateUserInput: Partial<NewUser>): Promise<User> {
        const _user = await this.db
            .update(user)
            .set(updateUserInput)
            .where(eq(user.id, id))
            .returning();
        return _user[0];
    }

}
