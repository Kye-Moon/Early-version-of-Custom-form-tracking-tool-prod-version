import {Injectable} from '@nestjs/common';
import {CreateJobFormResponseInput} from './dto/create-job-form-response.input';
import {UpdateJobFormResponseInput} from './dto/update-job-form-response.input';
import {JobFormResponseRepository} from "./job-form-response.repository";

@Injectable()
export class JobFormResponseService {

    constructor(
        private readonly jobFormResponseRepository: JobFormResponseRepository,
    ) {
    }

    create(createJobFormResponseInput: CreateJobFormResponseInput) {
        return this.jobFormResponseRepository.create(createJobFormResponseInput);
    }

    async findByJobRecordId(jobRecordId: string) {
        return await this.jobFormResponseRepository.findByJobRecordId(jobRecordId);
    }

    findAll() {
        return `This action returns all jobFormResponse`;
    }

    findOne(id: number) {
        return `This action returns a #${id} jobFormResponse`;
    }

    update(id: number, updateJobFormResponseInput: UpdateJobFormResponseInput) {
        return `This action updates a #${id} jobFormResponse`;
    }

    remove(id: number) {
        return `This action removes a #${id} jobFormResponse`;
    }
}
