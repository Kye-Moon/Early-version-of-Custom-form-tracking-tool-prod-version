import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {
    FormTemplate,
    formTemplate,
    JobForm,
    jobForm,
    jobFormResponse,
    NewJobForm,
    NewJobFormResponse
} from "../../drizzle/schema";
import {and, eq} from "drizzle-orm";

@Injectable()
export class JobFormResponseRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewJobFormResponse) {
        const _jobFormResponse = await this.db.insert(jobFormResponse).values([input]).returning()
        return _jobFormResponse[0]
    }

    async findByJobRecordId(jobRecordId: string) {
        const _response = await this.db.select()
            .from(jobFormResponse)
            .where(eq(jobFormResponse.jobRecordId, jobRecordId))
        return _response[0]
    }

}
