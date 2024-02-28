import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {JobScopeItemService} from './job-scope-item.service';
import {JobScopeItem} from './entities/job-scope-item.entity';
import {CreateJobScopeItemInput} from './dto/create-job-scope-item.input';
import {UpdateJobScopeItemInput} from './dto/update-job-scope-item.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => JobScopeItem)
export class JobScopeItemResolver {
    constructor(private readonly jobScopeItemService: JobScopeItemService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobScopeItem)
    createJobScopeItem(@Args('createJobScopeItemInput') createJobScopeItemInput: CreateJobScopeItemInput) {
        console.log('createJobScopeItemInput', createJobScopeItemInput);
        return this.jobScopeItemService.create(createJobScopeItemInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobScopeItem)
    updateJobScopeItem(@Args('updateJobScopeItemInput') updateJobScopeItemInput: UpdateJobScopeItemInput) {
        return this.jobScopeItemService.update(updateJobScopeItemInput.id, updateJobScopeItemInput);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobScopeItem)
    removeJobScopeItem(@Args('id', {type: () => String}) id: string) {
        return this.jobScopeItemService.remove(id);
    }

    @UseGuards(AuthGuard)
    @Query(() => [JobScopeItem])
    jobScopeItems(@Args('jobId', {type: () => String}) jobId: string) {
        return this.jobScopeItemService.findByJobId(jobId);
    }
}
