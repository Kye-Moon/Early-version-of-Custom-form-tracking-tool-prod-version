import {Injectable} from '@nestjs/common';
import {CreateFormTemplateInput} from './dto/create-form-template.input';
import {UpdateFormTemplateInput} from './dto/update-form-template.input';
import {FormTemplateRepository} from "./form-template.repository";
import {OrganisationRepository} from "../organisation/organisation.repository";
import {RequestService} from "../request/request.service";
import {SearchFormTemplateInput} from "./dto/search-form-template.input";

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
     * Duplicate a formTemplate by id
     * @param templateId
     */
    async duplicate(templateId: string) {
        const formTemplate = await this.formTemplateRepository.findById(templateId);
        const {id, name, status, ...formTemplateData} = formTemplate;
        return this.formTemplateRepository.create({
                ...formTemplateData,
                name: `${name} (copy)`,
                status: "PENDING"
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

    async search(search: SearchFormTemplateInput) {
        const organisation = await this.organisationRepository.findByAuthId(this.request.organisationId)
        search.organisationId = organisation.id;
        return this.formTemplateRepository.search(search);

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
