import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {formTemplate, jobForm, NewJobForm} from "../../drizzle/schema";
import {and, eq, inArray} from "drizzle-orm";

@Injectable()
export class JobFormRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewJobForm) {
        const _jobForm = await this.db.insert(jobForm).values([input]).returning()
        return _jobForm[0]
    }

    async createMany(input: NewJobForm[]) {
        return this.db.insert(jobForm).values(input).returning();
    }

    async findByJobId(jobId: string) {
        return await this.db.select({jobForm: jobForm})
            .from(jobForm)
            .innerJoin(formTemplate, eq(jobForm.formTemplateId, formTemplate.id))
            .where(eq(jobForm.jobId, jobId))
    }


    async getFormTemplatesByJobId(jobId: string) {
        return await this.db.select({formTemplate: formTemplate})
            .from(formTemplate)
            .innerJoin(jobForm, eq(jobForm.formTemplateId, formTemplate.id))
            .where(eq(jobForm.jobId, jobId))
    }

    async findByJobIdAndFormTemplateId(jobId: string, formTemplateId: string) {
        const _jobForm = await this.db.select()
            .from(jobForm)
            .where(and(
                eq(jobForm.jobId, jobId),
                eq(jobForm.formTemplateId, formTemplateId)
            ));
        return _jobForm[0]
    }

    async findById(id: string) {
        const _jobForm = await this.db.select()
            .from(jobForm)
            .where(eq(jobForm.id, id));
        return _jobForm[0]
    }

    async search(search: any) {
        return this.db.select({jobForm}).from(jobForm)
            .innerJoin(formTemplate, eq(jobForm.formTemplateId, formTemplate.id))
            .where(and(
                ...(search.includeStatuses ? [inArray(formTemplate.status, search.includeStatuses)] : []),
                eq(jobForm.jobId, search.jobId)
            ));
    }

    async findByIds(ids: string[]) {
        return this.db.select().from(jobForm).where(inArray(jobForm.id, ids));
    }
}
