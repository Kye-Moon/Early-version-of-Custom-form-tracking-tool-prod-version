import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {JobAttachmentService} from './job-attachment.service';
import {JobAttachment} from './entities/job-attachment.entity';
import {CreateJobAttachmentsInput} from './dto/create-job-attachment.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => JobAttachment)
export class JobAttachmentResolver {
    constructor(private readonly jobAttachmentService: JobAttachmentService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => [JobAttachment])
    createJobAttachments(@Args('createJobAttachmentInput') createJobAttachmentInput: CreateJobAttachmentsInput) {
        return this.jobAttachmentService.createMany(createJobAttachmentInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [JobAttachment])
    jobAttachments(@Args('jobId', {type: () => String}) jobId: string) {
        return this.jobAttachmentService.findAllByJobId(jobId);
    }

    @UseGuards(AuthGuard)
    @Query(() => JobAttachment, {name: 'jobAttachment'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.jobAttachmentService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean)
    removeJobAttachment(@Args('id', {type: () => String}) id: string) {
        return this.jobAttachmentService.remove(id);
    }
}
