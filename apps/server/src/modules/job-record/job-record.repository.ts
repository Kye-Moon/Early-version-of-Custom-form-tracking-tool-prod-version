import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {
    job,
    jobCrew,
    jobRecord,
    jobRecordImage,
    NewJobRecord, organisation,
    UpdateJobRecord,
    user,
    User, userOrganisation,
    variationInitialData
} from "../../drizzle/schema";
import {and, desc, eq, inArray, or} from "drizzle-orm";
import {JobRecordSearchInput} from "./dto/search-job-record";

@Injectable()
export class JobRecordRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async create(input: NewJobRecord) {
        const _variation = await this.db.insert(jobRecord).values([input]).returning()
        return _variation[0]
    }

    /**
     * Find all variations that a user has access to
     * A user has access to a job-record if they are the owner of the job or a crew member on the job that the job-record belongs to
     * @param userId
     * @param orgId
     * @param searchInput
     */
    async search({userId, orgId, searchInput}: { userId: string, orgId: string, searchInput?: JobRecordSearchInput }) {
        return await this.db.selectDistinctOn([jobRecord.id,jobRecord.createdAt])
            .from(jobRecord)
            .leftJoin(job, (eq(jobRecord.jobId, job.id)))
            .leftJoin(jobCrew, (eq(job.id, jobCrew.jobId)))
            .where(and(
                eq(job.organisationId, orgId),
                or(
                    eq(job.ownerId, userId),
                    eq(jobCrew.crewMemberId, userId)
                ),
                ...(searchInput.jobId ? [eq(jobRecord.jobId, searchInput.jobId)] : [])
            ))
            .limit(searchInput.limit)
            .orderBy((jobRecord.id))
            .orderBy(desc(jobRecord.createdAt))
    }

    async ownerSearch({orgId, jobId}: { orgId: string, jobId?: string }) {
        const sq = this.db.select({id: user.id})
            .from(user)
            .innerJoin(userOrganisation, (eq(user.id, userOrganisation.userId)))
            .innerJoin(organisation, (eq(userOrganisation.organisationId, organisation.id)))
            .where(eq(organisation.id, orgId))
            .as('sq')

        return this.db.select()
            .from(jobRecord)
            .leftJoin(job, (eq(jobRecord.jobId, job.id)))
            .where(
                and(
                    ...(jobId ? [eq(job.id, jobId)] : []),
                    inArray(job.ownerId, await this.db.select().from(sq).then((res) => res.map((r) => r.id))),
                )
            ).orderBy(desc(jobRecord.createdAt))
    }

    async findOne(id: string) {
        return await this.db.query.jobRecord.findFirst({
            where: eq(jobRecord.id, id),
        });
    }

    async findVariationJob(variationId: string) {
        const _variation = await this.db.query.jobRecord.findFirst({
            where: eq(jobRecord.id, variationId),
            with: {
                job: true
            }
        })
        return _variation.job
    }

    async findVariationSubmittedBy(variationId: string): Promise<User> {
        const _variation = await this.db.query.jobRecord.findFirst({
            where: eq(jobRecord.id, variationId),
            with: {
                submittedBy: true
            }
        })
        return _variation.submittedBy
    }

    async findVariationInitialData(variationId: string) {
        return await this.db.query.variationInitialData.findFirst({
            where: eq(variationInitialData.jobRecordId, variationId),
        })
    }

    async findVariationImages(variationId: string) {
        return await this.db.query.jobRecordImage.findMany({
            where: eq(jobRecordImage.jobRecordId, variationId),
        })
    }

    async findVariationResources(variationId: string) {
        return await this.db.query.variationResource.findMany({
            where: eq(jobRecordImage.jobRecordId, variationId),
        })
    }


    async update(id: string, input: UpdateJobRecord) {
        const _variation = await this.db.update(jobRecord).set({...input}).where(eq(jobRecord.id, id)).returning()
        return _variation[0]
    }

    async findByJobId(jobId: string) {
        return await this.db.query.jobRecord.findMany({
            where: eq(jobRecord.jobId, jobId),
        });
    }

}
