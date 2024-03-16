import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {attachment, NewAttachment} from "../../drizzle/schema";
import {eq} from "drizzle-orm";

@Injectable()
export class AttachmentRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async createMany(attachments: NewAttachment[]) {
        return this.db.insert(attachment).values(attachments).returning();
    }

    async findAllByJobId(jobId: string) {
        return this.db.select().from(attachment).where(eq(attachment.referenceId, jobId))
    }

    async deleteById(id: string) {
        return this.db.delete(attachment).where(eq(attachment.id, id));
    }
}