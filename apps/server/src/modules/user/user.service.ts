import {Injectable} from '@nestjs/common';
import {UpdateUserInput} from './dto/update-user.input';
import {User} from './entities/user.entity';
import {UserRepository} from './user.repository';
import {RequestService} from '../request/request.service';
import {SearchUserInput} from "./dto/search-user.input";
import {OrganisationService} from "../organisation/organisation.service";
import clerkClient from '@clerk/clerk-sdk-node'
import {OrganisationRepository} from "../organisation/organisation.repository";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";
import {Organisation} from "../../drizzle/schema";
import {InviteUserInput} from "./dto/invite-user.input";
import {UserOrganisationRepository} from "../user-organisation/user-organisation.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly request: RequestService,
        private readonly userRepository: UserRepository,
        private readonly organisationService: OrganisationService,
        private readonly organisationRepository: OrganisationRepository,
        private readonly userOrganisationService: UserOrganisationService,
        private readonly userOrganisationRepository: UserOrganisationRepository,
    ) {
    }

    async initialise(): Promise<User> {
        const organisation = await this.organisationService.findOrCreateByAuthId(this.request.organisationId);
        const authUser = await clerkClient.users.getUser(this.request.userId)
        let user = await this.userRepository.findOneByAuthId(authUser.id);
        // If user exists, check if they are part of the current organisation, if not, add them
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
            // User has signed In for the first time and does not exist in the database yet. Create a new user
            // and add them to the current organisation, with the role they have in the organisation. Also update their metadata to show they have been initialised
            user = await this.userRepository.createUser({
                name: authUser.firstName + ' ' + authUser.lastName,
                email: authUser.emailAddresses[0].emailAddress,
                authId: authUser.id,
                status: "ACTIVE",
            });
            console.log(user)
            const userOrgRole = await this.getUserRoleFromCurrentOrg(organisation);
            console.log(userOrgRole)
            await this.userOrganisationService.create({
                userId: user.id,
                organisationId: organisation.id,
                role: userOrgRole
            });
            console.log('created user org')
            const invitationList = await clerkClient.organizations.getOrganizationInvitationList({
                organizationId: this.request.organisationId,
                status: ['accepted']
            })
            console.log(invitationList.length)
            const userInvitation = invitationList.find((invitation) => invitation.emailAddress === authUser.emailAddresses[0].emailAddress);
            console.log(userInvitation)
            const appRole = userOrgRole === 'org:admin' ? "ADMIN" : userInvitation?.publicMetadata['varify_role'] ?? "MEMBER";
            await clerkClient.users.updateUserMetadata(user.authId, {
                publicMetadata: {
                    ...authUser.publicMetadata,
                    varify_role: appRole,
                    varify_initialised: true
                }
            })
            console.log('updated user metadata')
        }
        return user;
    }

    /**
     * Check if the user has been initialised
     * The user is initialised if their organisation exists, and they are part of it.
     */
    async isUserInitialised(): Promise<boolean> {
        const [organisation, user] = await Promise.all([
            this.organisationRepository.findByAuthId(this.request.organisationId),
            this.userRepository.findOneByAuthId(this.request.userId),
        ]);
        if (!organisation || !user) {
            return false;
        }
        const userOrg = await this.userOrganisationRepository.findOneByUserAndOrganisation(user.id, organisation.id);
        return !!userOrg;
    }

    async invite(input: InviteUserInput) {
        try {
            await clerkClient.organizations.createOrganizationInvitation({
                inviterUserId: this.request.userId,
                organizationId: this.request.organisationId,
                role: 'org:member',
                emailAddress: input.email,
                publicMetadata: {
                    'varify_role': input.role
                }
            })
        } catch (e) {
            console.log(e)
            throw new Error(e.errors[0].message);
        }
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
