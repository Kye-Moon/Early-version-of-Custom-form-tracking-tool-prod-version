import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {JobScopeItem, jobScopeItem, NewJobScopeItem} from "../../drizzle/schema";
import {asc, eq} from "drizzle-orm";

@Injectable()
export class JobScopeItemRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewJobScopeItem) {
        const result = await this.db.insert(jobScopeItem).values(input).returning()
        return result[0]
    }


    async update(id: string, input: Partial<JobScopeItem>) {
        const result = await this.db.update(jobScopeItem).set(input).where(eq(jobScopeItem.id, id)).returning()
        return result[0]
    }

    async findByJobId(jobId: string) {
        return this.db.select().from(jobScopeItem).where(eq(jobScopeItem.jobId, jobId)).orderBy(asc(jobScopeItem.createdAt))
    }

    async delete(id: string) {
        const result = await this.db.delete(jobScopeItem).where(eq(jobScopeItem.id, id)).returning()
        return result[0]
    }

    async findOne(id: string) {
        const result = await this.db.select().from(jobScopeItem).where(eq(jobScopeItem.id, id));
        return result[0]
    }
}