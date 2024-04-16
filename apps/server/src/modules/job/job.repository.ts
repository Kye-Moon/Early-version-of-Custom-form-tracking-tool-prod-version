import {Inject, Injectable} from '@nestjs/common';
import {ORM} from '../../drizzle/drizzle.module';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import {Job, job, jobCrew, NewJob, UpdateJob} from '../../drizzle/schema';
import {and, asc, eq, ilike, or} from 'drizzle-orm';
import {JobSearchInput} from './dto/search-job.input';

@Injectable()
export class JobRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async createJob(newJobInput: NewJob): Promise<Job> {
        const _job = await this.db.insert(job).values([newJobInput]).returning();
        return _job[0];
    }

    async search(searchInput: JobSearchInput & { userId: string, organisationId: string }) {

        const query = this.db.select({job: job})
            .from(job)
            .leftJoin(jobCrew, (eq(job.id, jobCrew.jobId)));

        let conditions = [
            eq(job.organisationId, searchInput.organisationId),
            or(
                eq(job.ownerId, searchInput.userId),
                eq(jobCrew.crewMemberId, searchInput.userId)
            ),
            ...(searchInput.projectId ? [eq(job.projectId, searchInput.projectId)] : []),
            ...(searchInput.title ? [ilike(job.title, `%${searchInput.title}%`)] : []),
            ...(searchInput.status ? [eq(job.status, searchInput.status)] : []),
            ...(searchInput.customer ? [ilike(job.customerName, `%${searchInput.customer}%`)] : []),
        ];

        query.where(and(...conditions));
        query.groupBy(job.id)
            .orderBy(asc(job.createdAt))
            .limit(searchInput.limit)
            .offset(searchInput.offset);

        return await query.execute();
    }

    // async ownerSearch({orgId, limit, offset}: { orgId: string, limit: number, offset: number }): Promise<Job[]> {
    //     const sq = this.db.select({id: user.id})
    //         .from(user)
    //         .innerJoin(userOrganisation, (eq(user.id, userOrganisation.userId)))
    //         .innerJoin(organisation, eq(userOrganisation.organisationId, organisation.id))
    //         .where(eq(organisation.id, orgId))
    //         .as('sq')
    //
    //     const ids = await this.db.select().from(sq).then((res) => res.map((r) => r.id));
    //     console.log('ids', ids);
    //
    //     return this.db.select()
    //         .from(job)
    //         .where(
    //             inArray(job.ownerId, await this.db.select().from(sq).then((res) => res.map((r) => r.id))),
    //         )
    //         .orderBy(asc(job.createdAt))
    //         .limit(limit)
    //         .offset(offset)
    // }

    async findByProjectId(projectId: string) {
        return await this.db.query.job.findMany({
            where: eq(job.projectId, projectId),
        });
    }

    async findOne(id: string): Promise<Job> {
        return await this.db.query.job.findFirst({
            where: eq(job.id, id),
        });
    }

    async update(id: string, updateJobInput: UpdateJob): Promise<Job> {

        console.log('updateJobInput', updateJobInput);
        const _job = await this.db.update(job).set({
            title: updateJobInput.title,
            description: updateJobInput.description,
            customerName: updateJobInput.customerName,
            status: updateJobInput.status,
            projectId: updateJobInput.projectId,
        }).where(eq(job.id, id)).returning();
        return _job[0];
    }

    async delete(id: string): Promise<boolean> {
        await this.db.delete(job).where(eq(job.id, id));
        return true;
    }
}
