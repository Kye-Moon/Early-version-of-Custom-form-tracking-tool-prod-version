import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
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

@Resolver(() => JobRecord)
export class JobRecordResolver {
    constructor(
        private readonly jobRecordService: JobRecordService,
        private readonly jobScopeItemService: JobScopeItemService
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobRecord)
    async createJobRecord(@Args('createJobRecordInput') createJobRecordInput: CreateJobRecordInput) {
        const result =  await this.jobRecordService.create(createJobRecordInput);
        console.log('result', result)
        return result;
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
    removeVariation(@Args('id', {type: () => Int}) id: number) {
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

}
