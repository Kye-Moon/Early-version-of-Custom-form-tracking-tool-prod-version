import {Injectable} from '@nestjs/common';
import {CreateAttachmentsInput} from './dto/create-attachment.input';
import {AttachmentRepository} from "./attachment.repository";

@Injectable()
export class AttachmentService {

    constructor(
        private readonly attachmentRepository: AttachmentRepository,
    ) {
    }

    async createMany(createJobAttachmentInput: CreateAttachmentsInput) {
        const {referenceId, referenceType} = createJobAttachmentInput;
        const attachments = createJobAttachmentInput.attachments.map((attachment) => {
            const {name, url, type} = attachment;
            return {
                referenceId,
                referenceType,
                name,
                url,
                type,
            };
        });
        console.log(attachments);
        return this.attachmentRepository.createMany(attachments);
    }

    findAllByJobId(jobId: string) {
        return this.attachmentRepository.findAllByJobId(jobId);
    }

    findOne(id: number) {
        return `This action returns a #${id} jobAttachment`;
    }

    async remove(id: string) {
        const result = await this.attachmentRepository.deleteById(id);
        if (result.rowCount > 0) {
            return true;
        } else throw new Error('Error deleting attachment');
    }
}
