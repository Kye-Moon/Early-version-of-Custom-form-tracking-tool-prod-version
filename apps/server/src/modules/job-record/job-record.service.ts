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

@Injectable()
export class JobRecordService {

    constructor(
        private readonly jobRecordRepository: JobRecordRepository,
        private readonly request: RequestService,
        private readonly variationImageService: JobRecordImageService,
        private readonly variationInitialDataService: VariationInitialDataService,
        private readonly userRepository: UserRepository,
        private readonly organisationRepository: OrganisationRepository
    ) {
    }

    async create(createJobRecordInput: CreateJobRecordInput) {
        const user = await this.userRepository.findOneByAuthId(this.request.userId);
        const record = await this.jobRecordRepository.create({
            ...createJobRecordInput,
            submittedBy: user.id,
        })
        if (createJobRecordInput.type === 'VARIATION') {
            await this.variationInitialDataService.create({
                hours: createJobRecordInput.hours,
                who: createJobRecordInput.who,
                materials: createJobRecordInput.materials,
                equipment: createJobRecordInput.equipment,
                numPeople: createJobRecordInput.numPeople,
            }, record.id)
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
                ...record.job_record,
            }
        })
    }

    findOne(id: string) {
        return this.jobRecordRepository.findOne(id)
    }

    async update(id: string, updateVariationInput: UpdateJobRecordInput) {
        const {imageUrls, ...newVariation} = updateVariationInput
        const jobRecord = await this.jobRecordRepository.update(id, newVariation)
        console.log('jobRecord', jobRecord)
        if (updateVariationInput.imageUrls?.length > 0) {
            updateVariationInput.imageUrls.map(async (url) => {
                await this.variationImageService.create({
                    jobRecordId: jobRecord.id,
                    url,
                })
            })
        }
        console.log('jobRecord', jobRecord)
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
