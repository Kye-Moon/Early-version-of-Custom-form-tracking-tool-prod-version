import {Injectable} from '@nestjs/common';
import {CreateProjectInput} from './dto/create-project.input';
import {UpdateProjectInput} from './dto/update-project.input';
import {ProjectRepository} from "./project.repository";
import {RequestService} from "../request/request.service";
import {OrganisationService} from "../organisation/organisation.service";
import {OrganisationRepository} from "../organisation/organisation.repository";

@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly request: RequestService,
        private readonly organisationRepository: OrganisationRepository,
    ) {
    }

    async create(createProjectInput: CreateProjectInput) {
        const org = await this.organisationRepository.findByAuthId(this.request.organisationId);
        return this.projectRepository.create({
            ...createProjectInput,
            organisationId: org.id
        });
    }

    async findAll() {
        const org = await this.organisationRepository.findByAuthId(this.request.organisationId);
        return this.projectRepository.findAll(org.id);
    }

    async findOne(id: string) {
        const project = await this.projectRepository.findOne(id);
        return project[0];
    }

    update(id: string, updateProjectInput: UpdateProjectInput) {
        return this.projectRepository.update(id, updateProjectInput);
    }

    remove(id: string) {
        return this.projectRepository.remove(id);
    }
}
