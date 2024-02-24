import {Injectable} from '@nestjs/common';
import {UserRepository} from "../user/user.repository";
import {UserOrganisationRepository} from "./user-organisation.repository";
import {RequestService} from "../request/request.service";
import {NewUserOrganisation} from "../../drizzle/schema";
import {OrganisationRepository} from "../organisation/organisation.repository";

@Injectable()
export class UserOrganisationService {
    constructor(
        private readonly userOrganisationRepository: UserOrganisationRepository,
        private readonly request: RequestService,
        private readonly userRepository: UserRepository,
        private readonly organisationRepository: OrganisationRepository
    ) {
    }

    async create(input: NewUserOrganisation) {
        return await this.userOrganisationRepository.create(input);
    }

    async getCurrentUserOrganisation() {
        const org = await this.organisationRepository.findByAuthId(this.request.organisationId);
        const user = await this.userRepository.findOneByAuthId(this.request.userId);
        return await this.userOrganisationRepository.findOneByUserAndOrganisation(user.id, org.id);
    }

    async getCurrentUserOrganisationByUserId(userId: string) {
        const org = await this.organisationRepository.findByAuthId(this.request.organisationId);
        return await this.userOrganisationRepository.findOneByUserAndOrganisation(userId, org.id);
    }

    async getAllByUserId(userId: string) {
        return await this.userOrganisationRepository.findAllByUserId(userId);
    }

}
