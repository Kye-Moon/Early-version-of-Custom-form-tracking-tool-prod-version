import {Injectable} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {UpdateUserInput} from './dto/update-user.input';
import {User} from './entities/user.entity';
import {UserRepository} from './user.repository';
import {RequestService} from '../request/request.service';
import {SearchUserInput} from "./dto/search-user.input";
import {SmsService} from "../sms/sms.service";
import * as bcrypt from "bcrypt";
import {OrganisationService} from "../organisation/organisation.service";
import clerkClient from '@clerk/clerk-sdk-node'
import {OrganisationRepository} from "../organisation/organisation.repository";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";
import {Organisation} from "../../drizzle/schema";

@Injectable()
export class UserService {
    constructor(
        private readonly request: RequestService,
        private readonly userRepository: UserRepository,
        private readonly organisationService: OrganisationService,
        private readonly organisationRepository: OrganisationRepository,
        private readonly userOrganisationService: UserOrganisationService,
    ) {
    }

    async initialise(): Promise<User> {
        const organisation = await this.organisationService.findOrCreateByAuthId(this.request.organisationId);
        const authUser = await clerkClient.users.getUser(this.request.userId)
        let user = await this.userRepository.findOneByAuthId(authUser.id);
        if (user) {
            const userOrgs = await this.userOrganisationService.getAllByUserId(user.id);
            const userOrg = userOrgs.find((userOrg) => userOrg.organisationId === organisation.id);
            if (!userOrg) {
                const userOrgRole = await this.getUserRoleFromCurrentOrg(organisation);
                await this.userOrganisationService.create({
                    userId: user.id,
                    organisationId: organisation.id,
                    role: userOrgRole
                });
            }
        } else {
            // User is signing up for the first time and was not invited
            user = await this.userRepository.createUser({
                name: authUser.firstName + ' ' + authUser.lastName,
                email: authUser.emailAddresses[0].emailAddress,
                authId: authUser.id,
                status: "ACTIVE",
            });
            const userOrgRole = await this.getUserRoleFromCurrentOrg(organisation);
            await this.userOrganisationService.create({
                userId: user.id,
                organisationId: organisation.id,
                role: userOrgRole
            });
            await clerkClient.users.updateUserMetadata(user.authId, {
                publicMetadata: {
                    ...authUser.publicMetadata,
                    varify_initialised: true
                }
            })
        }
        return user;
    }

    async search(searchInput: SearchUserInput) {
        const org = await this.organisationRepository.findByAuthId(this.request.organisationId);
        searchInput.organisationId = org.id;
        const results = await this.userRepository.search(searchInput);
        return results.map((result) => {
            return {
                ...result.user
            }
        });
    }

    async findOne(id: string) {
        return await this.userRepository.findOneById(id);
    }

    async currentUser() {
        return await this.userRepository.findOneById(this.request.userId);
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const user = await this.userRepository.findOneById(id);
        if (user) {
            return await this.userRepository.updateUser(id, updateUserInput);
        }
        return null;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    getUserRoleFromCurrentOrg = async (organisation: Organisation) => {
        const authOrgMemberships = await clerkClient.users.getOrganizationMembershipList({userId: this.request.userId});
        const userOrg = authOrgMemberships.find((membership) => membership.organization.id === organisation.authId);
        return userOrg.role;
    }
}
