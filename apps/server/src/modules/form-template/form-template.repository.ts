import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {formTemplate, jobRecord, NewFormTemplate} from "../../drizzle/schema";
import {eq, or} from "drizzle-orm";

@Injectable()
export class FormTemplateRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewFormTemplate) {
        const _formTemplate = await this.db.insert(formTemplate).values([input]).returning()
        return _formTemplate[0]
    }

    async findById(id: string) {
        return await this.db.query.formTemplate.findFirst({
            where: eq(formTemplate.id, id),
        });
    }

    async update(id: string, input: Partial<NewFormTemplate>) {
        const _formTemplate = await this.db.update(formTemplate).set(input).where(eq(formTemplate.id, id)).returning()
        return _formTemplate[0]
    }

    async findAll(organisationId: string) {
        return this.db.select().from(formTemplate).where(or(
            eq(formTemplate.organisationId, organisationId),
            eq(formTemplate.isSystemDefault, true)
        ));
    }
}
