import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {JobRecordService} from './job-record.service';
import {JobRecord} from './entities/job-record.entity';
import {CreateJobRecordInput} from './dto/create-job-record.input';
import {UpdateJobRecordInput} from './dto/update-job-record.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";
import {Job} from "../job/entities/job.entity";
import {User} from "../user/entities/user.entity";
import {JobRecordSearchInput} from "./dto/search-job-record";
import {VariationInitialData} from "../variation-initial-data/entities/variation-initial-data.entity";
import {JobRecordImage} from "../job-record-image/entities/job-record-image.entity";
import {VariationResource} from "../variation-resource/entities/variation-resource.entity";
import {JobScopeItem} from "../job-scope-item/entities/job-scope-item.entity";
import {JobScopeItemService} from "../job-scope-item/job-scope-item.service";
import {JobForm} from "../job-form/entities/job-form.entity";
import {JobFormService} from "../job-form/job-form.service";
import {JobFormResponse} from "../job-form-response/entities/job-form-response.entity";
import {JobFormResponseService} from "../job-form-response/job-form-response.service";

@Resolver(() => JobRecord)
export class JobRecordResolver {
    constructor(
        private readonly jobRecordService: JobRecordService,
        private readonly jobScopeItemService: JobScopeItemService,
        private readonly jobFormService: JobFormService,
        private readonly jobFormResponseService: JobFormResponseService,
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobRecord)
    async createJobRecord(@Args('createJobRecordInput') createJobRecordInput: CreateJobRecordInput) {
        return await this.jobRecordService.create(createJobRecordInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [JobRecord], {name: 'searchJobRecords'})
    async searchJobRecords(@Args('jobRecordSearchInput') jobRecordSearchInput: JobRecordSearchInput) {
        return await this.jobRecordService.search(jobRecordSearchInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => JobRecord, {name: 'jobRecord'})
    findOne(@Args('id', {type: () => String}) id: string) {
        return this.jobRecordService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobRecord)
    async updateJobRecord(@Args('updateJobRecordInput') updateJobRecordInput: UpdateJobRecordInput) {
        return await this.jobRecordService.update(updateJobRecordInput.id, updateJobRecordInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobRecord)
    removeJobRecord(@Args('id', {type: () => String}) id: string) {
        return this.jobRecordService.remove(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => Job)
    async job(@Parent() variation: JobRecord) {
        const {id} = variation;
        return this.jobRecordService.getVariationJob(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => User)
    async submittedBy(@Parent() user: User) {
        const {id} = user;
        return this.jobRecordService.getVariationSubmittedBy(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => VariationInitialData)
    async initialData(@Parent() variation: JobRecord) {
        const {id} = variation;
        return await this.jobRecordService.getVariationInitialData(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => [JobRecordImage])
    async images(@Parent() variation: JobRecord) {
        const {id} = variation;
        return await this.jobRecordService.getVariationImages(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => [VariationResource])
    async resources(@Parent() variation: JobRecord) {
        const {id} = variation;
        return await this.jobRecordService.getVariationResources(id);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => JobScopeItem)
    async scopeItem(@Parent() variation: JobRecord) {
        const {scopeRef} = variation;
        return await this.jobScopeItemService.findOne(scopeRef);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => JobForm)
    async jobForm(@Parent() jobRecord: JobRecord) {
        const {jobFormId} = jobRecord;
        console.log('getting job form', jobFormId)
        if (!jobFormId) return null;
        return await this.jobFormService.findById(jobFormId);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => [JobFormResponse])
    async formResponse(@Parent() jobRecord: JobRecord) {
        const {id} = jobRecord;
        return await this.jobFormResponseService.findByJobRecordId(id)
    }

}
