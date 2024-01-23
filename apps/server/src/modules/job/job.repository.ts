import {Inject, Injectable} from '@nestjs/common';
import {ORM} from '../../drizzle/drizzle.module';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import {Job, job, jobCrew, NewJob, UpdateJob, user} from '../../drizzle/schema';
import {and, asc, eq, inArray, or} from 'drizzle-orm';
import {JobSearchInput} from './dto/search-job.input';

@Injectable()
export class JobRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async createJob(newJobInput: NewJob): Promise<Job> {
        const _job = await this.db.insert(job).values([newJobInput]).returning();
        return _job[0];
    }

    /**
     * Find all jobs that an admin user has access to
     * No inclusions
     * @param userId
     */
    async findAllByOwnerId({userId}: { userId: string }): Promise<Job[]> {
        return await this.db.query.job.findMany({
            where: eq(job.ownerId, userId),
        });
    }

    async search(searchInput: JobSearchInput) {
        return this.db.select()
            .from(job)
            .leftJoin(jobCrew, (eq(job.id, jobCrew.jobId)))
            .where(or(
                eq(job.ownerId, searchInput.ownerId),
                eq(jobCrew.crewMemberId, searchInput.ownerId)
            ))
            .offset(searchInput.offset)
            .limit(searchInput.limit)
            .orderBy(asc(job.createdAt))
    }

    async ownerSearch({orgId,limit,offset}: { orgId: string, limit: number, offset: number }): Promise<Job[]> {
        const sq = this.db.select({id: user.id})
            .from(user)
            .where(
                and(
                    eq(user.organisationId, orgId),
                    inArray(user.role, ['OWNER'])
                )
            )
            .as('sq')

        return this.db.select()
            .from(job)
            .where(
                inArray(job.ownerId, await this.db.select().from(sq).then((res) => res.map((r) => r.id))),
            )
            .orderBy(asc(job.createdAt))
            .limit(limit)
            .offset(offset)
    }

    async findOne(id: string): Promise<Job> {
        return await this.db.query.job.findFirst({
            where: eq(job.id, id),
        });
    }

    async update(id: string, updateJobInput: UpdateJob): Promise<Job> {
        const _job = await this.db.update(job).set({
            title: updateJobInput.title,
            description: updateJobInput.description,
            customerName: updateJobInput.customerName,
            status: updateJobInput.status,
        }).where(eq(job.id, id)).returning();
        return _job[0];
    }

    async findByVariationId(variationId: string): Promise<Job> {
        const _job = this.db.query.job.findFirst({
            where: eq(job.id, variationId),
        });
        return null
    }

    async delete(id: string): Promise<boolean> {
        await this.db.delete(job).where(eq(job.id, id));
        return true;
    }
}
