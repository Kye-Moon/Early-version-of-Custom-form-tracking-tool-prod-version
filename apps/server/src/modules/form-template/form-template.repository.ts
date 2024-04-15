import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {formTemplate, NewFormTemplate} from "../../drizzle/schema";
import {and, eq, inArray, or} from "drizzle-orm";
import {SearchFormTemplateInput} from "./dto/search-form-template.input";

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

    async findAutoAssignable(organisationId: string) {
        return this.db.select().from(formTemplate).where(and(
            eq(formTemplate.organisationId, organisationId),
            eq(formTemplate.autoAssign, true)
        ));
    }

    async search(search: SearchFormTemplateInput) {
        return this.db.select().from(formTemplate).where(and(
            ...(search.includeStatuses ? [inArray(formTemplate.status, search.includeStatuses)] : []),
            or(
                eq(formTemplate.organisationId, search.organisationId),
                eq(formTemplate.isSystemDefault, true)
            )
        ));
    }

    async findSystemDefaults() {
        return this.db.select().from(formTemplate).where(eq(formTemplate.isSystemDefault, true));
    }
}
