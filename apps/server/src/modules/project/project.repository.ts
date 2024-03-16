import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {NewProject, Project, project} from "../../drizzle/schema";
import {eq} from "drizzle-orm";

@Injectable()
export class ProjectRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewProject) {
        const _project = await this.db.insert(project).values([input]).returning()
        return _project[0]
    }

    async findAll(orgId: string) {
        return this.db.select()
            .from(project)
            .where(eq(project.organisationId, orgId))
    }

    async findOne(id: string) {
        return this.db.select()
            .from(project)
            .where(eq(project.id, id))
    }

    async update(id: string, input: Partial<Project>) {
        const _project = await this.db.update(project).set(input).where(eq(project.id, id)).returning()
        return _project[0]
    }

    async remove(id: string) {
        const _project = await this.db.delete(project).where(eq(project.id, id)).returning()
        return _project[0]
    }
}