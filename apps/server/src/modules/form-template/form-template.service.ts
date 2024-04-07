import {Injectable} from '@nestjs/common';
import {CreateFormTemplateInput} from './dto/create-form-template.input';
import {UpdateFormTemplateInput} from './dto/update-form-template.input';
import {FormTemplateRepository} from "./form-template.repository";
import {OrganisationRepository} from "../organisation/organisation.repository";
import {RequestService} from "../request/request.service";

@Injectable()
export class FormTemplateService {
    constructor(
        private formTemplateRepository: FormTemplateRepository,
        private organisationRepository: OrganisationRepository,
        private request: RequestService,
    ) {
    }

    async create(createFormTemplateInput: CreateFormTemplateInput) {
        const organisation = await this.organisationRepository.findByAuthId(this.request.organisationId)
        return this.formTemplateRepository.create({
                ...createFormTemplateInput,
                organisationId: organisation.id
            }
        );
    }

    /**
     * Find all formTemplate (all is based on the organisation and the system defaults)
     */
    async findAll() {
        const organisation = await this.organisationRepository.findByAuthId(this.request.organisationId)
        return this.formTemplateRepository.findAll(organisation.id);
    }

    async findOne(id: string) {
        return await this.formTemplateRepository.findById(id);
    }

    async update(id: string, updateFormTemplateInput: UpdateFormTemplateInput) {
        return await this.formTemplateRepository.update(id, updateFormTemplateInput);
    }

    remove(id: number) {
        return `This action removes a #${id} formTemplate`;
    }
}
