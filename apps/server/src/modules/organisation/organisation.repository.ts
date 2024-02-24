import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {NewOrganisation, organisation, userOrganisation} from "../../drizzle/schema";
import {eq} from "drizzle-orm";

@Injectable()
export class OrganisationRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async findByAuthId(authId: string) {
        return await this.db.query.organisation.findFirst({
            where: eq(organisation.authId, authId)
        })
    }

    async findOneById(id: string) {
        return await this.db.query.organisation.findFirst({
            where: eq(organisation.id, id)
        })
    }

    async findOneByName(name: string) {
        return await this.db.query.organisation.findFirst({
            where: eq(organisation.name, name)
        })
    }

    async create(input: NewOrganisation) {
        const _org = await this.db.insert(organisation).values([input]).returning();
        return _org[0];
    }

    async update(id: string, input: Partial<NewOrganisation>) {
        const _org = await this.db.update(organisation).set(input).where(eq(organisation.id, id)).returning();
        return _org[0];
    }

    async delete(id: string) {
        await this.db.delete(organisation).where(eq(organisation.id, id));
    }



}