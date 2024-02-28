import {Inject, Injectable} from '@nestjs/common';
import {ORM} from '../../drizzle/drizzle.module';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import {NewUserOrganisation, userOrganisation} from "../../drizzle/schema";
import {and, eq} from "drizzle-orm";


@Injectable()
export class UserOrganisationRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewUserOrganisation) {
        const _userOrganisation = await this.db.insert(userOrganisation).values([input]).returning()
        return _userOrganisation[0]
    }

    async findOneByUserAndOrganisation(userId: string, organisationId: string) {
        const _userOrganisation = await this.db
            .select()
            .from(userOrganisation)
            .where(
                and(
                    eq(userOrganisation.userId, userId),
                    eq(userOrganisation.organisationId, organisationId)
                )
            )
        return _userOrganisation[0]
    }

    async findAllByUserId(userId: string) {
        return await this.db.query.userOrganisation.findMany({
            where: eq(userOrganisation.userId, userId)
        })
    }

    const
}
