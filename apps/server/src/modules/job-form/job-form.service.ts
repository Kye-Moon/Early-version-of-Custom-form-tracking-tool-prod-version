import {Injectable} from '@nestjs/common';
import {CreateJobFormInput} from './dto/create-job-form.input';
import {UpdateJobFormInput} from './dto/update-job-form.input';
import {JobFormRepository} from "./job-form.repository";

@Injectable()
export class JobFormService {
    constructor(
        private readonly jobFormRepository: JobFormRepository,
    ) {
    }

    async create(createJobFormInput: CreateJobFormInput) {
        return await this.jobFormRepository.create(createJobFormInput);
    }

    async findByJobId(jobId: string) {
        return await this.jobFormRepository.findByJobId(jobId);
    }

    async getFormTemplatesByJobId(jobId: string) {
        const result =  await this.jobFormRepository.getFormTemplatesByJobId(jobId);
        return result.map((item) => item.formTemplate)
    }


    async findById(id: string) {
        return await this.jobFormRepository.findById(id);
    }

    update(id: number, updateJobFormInput: UpdateJobFormInput) {
        return `This action updates a #${id} jobForm`;
    }

    remove(id: number) {
        return `This action removes a #${id} jobForm`;
    }
}
