import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {AttachmentService} from './attachment.service';
import {Attachment} from './entities/attachment.entity';
import {CreateAttachmentsInput} from './dto/create-attachment.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => Attachment)
export class AttachmentResolver {
    constructor(private readonly attachmentService: AttachmentService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => [Attachment])
    createAttachments(@Args('createAttachmentInput') createAttachmentInput: CreateAttachmentsInput) {
        return this.attachmentService.createMany(createAttachmentInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Attachment])
    attachments(@Args('referenceId', {type: () => String}) jobId: string) {
        return this.attachmentService.findAllByJobId(jobId);
    }

    @UseGuards(AuthGuard)
    @Query(() => Attachment, {name: 'jobAttachment'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.attachmentService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean)
    removeJobAttachment(@Args('id', {type: () => String}) id: string) {
        return this.attachmentService.remove(id);
    }
}
