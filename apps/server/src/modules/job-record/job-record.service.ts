import {Injectable} from '@nestjs/common';
import {CreateJobRecordInput} from './dto/create-job-record.input';
import {UpdateJobRecordInput} from './dto/update-job-record.input';
import {RequestService} from "../request/request.service";
import {JobRecordRepository} from "./job-record.repository";
import {JobRecordImageService} from "../job-record-image/job-record-image.service";
import {JobRecordSearchInput} from "./dto/search-job-record";
import {VariationInitialDataService} from "../variation-initial-data/variation-initial-data.service";
import {UserRepository} from "../user/user.repository";
import {OrganisationRepository} from "../organisation/organisation.repository";
import {FormTemplateService} from "../form-template/form-template.service";
import dayjs from "dayjs";
import {JobFormService} from "../job-form/job-form.service";
import {JobFormRepository} from "../job-form/job-form.repository";
import {JobFormResponseService} from "../job-form-response/job-form-response.service";

@Injectable()
export class JobRecordService {

    constructor(
        private readonly jobRecordRepository: JobRecordRepository,
        private readonly request: RequestService,
        private readonly variationImageService: JobRecordImageService,
        private readonly variationInitialDataService: VariationInitialDataService,
        private readonly userRepository: UserRepository,
        private readonly organisationRepository: OrganisationRepository,
        private readonly formTemplateService: FormTemplateService,
        private readonly jobFromRepository: JobFormRepository,
        private readonly jobFromResponseService: JobFormResponseService,
    ) {
    }

    async create(createJobRecordInput: CreateJobRecordInput) {
        console.log(createJobRecordInput)
        const user = await this.userRepository.findOneByAuthId(this.request.userId);
        const {formId, formContent, title, ...jobRecordRest} = createJobRecordInput
        let derivedTitle = title
        let formTemplate = null
        let jobForm = null
        if (formId) {
            jobForm = await this.jobFromRepository.findByJobIdAndFormTemplateId(createJobRecordInput.jobId, formId)
            if (!jobForm) {
                throw new Error("Cannot submit a form that is not assigned to the job")
            }
        }

        if (formId && !title) {

            formTemplate = await this.formTemplateService.findOne(formId)
            derivedTitle = formTemplate.name + " submission - " + dayjs().format("DD/MM/YY HH:mm")
        }

        const record = await this.jobRecordRepository.create({
            ...jobRecordRest,
            jobFormId: jobForm ? jobForm.id : null,
            title: derivedTitle,
            type: formTemplate ? formTemplate.category : "UNASSIGNED",
            submittedBy: user.id,
        })

        if (formId && formContent) {
            await this.jobFromResponseService.create({
                jobFormId: jobForm.id,
                jobRecordId: record.id,
                response: formContent
            })
        }

        return record

    }

    async search(searchInput: JobRecordSearchInput) {
        const user = await this.userRepository.findOneByAuthId(this.request.userId);
        const org = await this.organisationRepository.findByAuthId(this.request.organisationId);

        const result = await this.jobRecordRepository.search({
            searchInput: searchInput,
            userId: user.id,
            orgId: org.id
        })

        return result.map((record) => {
            return {
                ...record.jobRecord,
            }
        })
    }

    findOne(id: string) {
        return this.jobRecordRepository.findOne(id)
    }

    async update(id: string, updateVariationInput: UpdateJobRecordInput) {
        const {imageUrls, ...newVariation} = updateVariationInput
        const jobRecord = await this.jobRecordRepository.update(id, newVariation)
        if (updateVariationInput.imageUrls?.length > 0) {
            updateVariationInput.imageUrls.map(async (url) => {
                await this.variationImageService.create({
                    jobRecordId: jobRecord.id,
                    url,
                })
            })
        }
        return jobRecord
    }


    remove(id: number) {
        return `This action removes a #${id} variation`;
    }

    async findJobRecords(jobId: string) {
        return await this.jobRecordRepository.findByJobId(jobId)
    }

    getVariationJob(id: string) {
        return this.jobRecordRepository.findVariationJob(id)
    }

    getVariationSubmittedBy(id: string) {
        return this.jobRecordRepository.findVariationSubmittedBy(id)
    }

    async getVariationInitialData(id: string) {
        return await this.jobRecordRepository.findVariationInitialData(id)
    }

    async getVariationImages(id: string) {
        return await this.jobRecordRepository.findVariationImages(id)
    }

    async getVariationResources(id: string) {
        return await this.jobRecordRepository.findVariationResources(id)
    }
}
