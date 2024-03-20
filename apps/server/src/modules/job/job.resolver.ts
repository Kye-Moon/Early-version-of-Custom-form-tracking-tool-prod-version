import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {JobService} from './job.service';
import {Job} from './entities/job.entity';
import {CreateJobInput} from './dto/create-job.input';
import {UpdateJobInput} from './dto/update-job.input';
import {UseGuards} from '@nestjs/common';
import {JobSearchInput} from './dto/search-job.input';
import {JobRecord} from "../job-record/entities/job-record.entity";
import {JobRecordService} from "../job-record/job-record.service";
import {JobScopeItem} from "../job-scope-item/entities/job-scope-item.entity";
import {JobScopeItemService} from "../job-scope-item/job-scope-item.service";
import {Attachment} from "../attachment/entities/attachment.entity";
import {AttachmentService} from "../attachment/attachment.service";
import {AuthGuard} from "../../guards/auth.guard";
import {ProjectService} from "../project/project.service";
import {Project} from "../project/entities/project.entity";

@Resolver(() => Job)
export class JobResolver {
    constructor(
        private readonly jobService: JobService,
        private readonly jobRecordService: JobRecordService,
        private readonly jobScopeItemService: JobScopeItemService,
        private readonly attachmentService: AttachmentService,
        private readonly projectService: ProjectService,
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Job)
    createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
        return this.jobService.create(createJobInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Job])
    searchJobs(@Args('jobSearchInput') searchInput: JobSearchInput) {
        return this.jobService.search(searchInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => Job, {name: 'job'})
    job(@Args('id', {type: () => String}) id: string) {
        return this.jobService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Job)
    updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
        return this.jobService.update(updateJobInput.id, updateJobInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean)
    deleteJob(@Args('id', {type: () => String}) id: string) {
        return this.jobService.delete(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => [JobRecord])
    variations(@Parent() job: Job) {
        const {id} = job;
        return this.jobRecordService.findJobRecords(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => [JobScopeItem])
    scopeItems(@Parent() job: Job) {
        const {id} = job;
        return this.jobScopeItemService.findByJobId(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => [Attachment])
    attachments(@Parent() job: Job) {
        const {id} = job;
        return this.attachmentService.findAllByJobId(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => Project)
    async project(@Parent() job: Job) {
        const {projectId} = job;
        return await this.projectService.findOne(projectId);
    }
}
