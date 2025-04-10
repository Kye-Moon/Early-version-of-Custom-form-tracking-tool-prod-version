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

interface OrgRoles {
    [orgId: string]: string; // orgId as key and role as value
}

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

    /**
     * Initialise the user
     * This function is called when the user logs in for the first time
     * It checks if the user exists in the database, if not, it creates a new user
     * It then checks if the user is part of the current organisation, if not, it adds them
     *
     */
    async initialise(): Promise<User> {
        let user, organisation, userOrgRole

        const authUser = await clerkClient.users.getUser(this.request.userId)
        user = await this.userRepository.findOneByAuthId(authUser.id);

        organisation = await this.organisationService.findOrCreateByAuthId(this.request.organisationId);
        userOrgRole = await this.getUserRoleFromCurrentOrg(organisation);

        const invitationList = await clerkClient.organizations.getOrganizationInvitationList({
            organizationId: this.request.organisationId,
            status: ['accepted']
        })
        const userInvitation = invitationList.find((invitation) => invitation.emailAddress === authUser.emailAddresses[0].emailAddress);
        const appRole = userOrgRole === 'org:admin' ? "ADMIN" : userInvitation?.publicMetadata['varify_role'] ?? "MEMBER";

        // If user exists, check if they are part of the current organisation, if not, add them
        if (user) {
            const userOrgs = await this.userOrganisationService.getAllByUserId(user.id);
            const userOrg = userOrgs.find((userOrg) => userOrg.organisationId === organisation.id);

            if (!userOrg) {
                await this.userOrganisationService.create({
                    userId: user.id,
                    organisationId: organisation.id,
                    role: userOrgRole
                });
            }
        } else {
            // Used has signed In for the first time and does not exist in the database yet. Create a new user
            // and add them to the current organisation, with the role they have in the organisation. Also update their metadata to show they have been initialised
            user = await this.userRepository.createUser({
                name: authUser.firstName + ' ' + authUser.lastName,
                email: authUser.emailAddresses[0].emailAddress,
                authId: authUser.id,
                status: "ACTIVE",
            });
        }
        await clerkClient.users.updateUserMetadata(user.authId, {
            publicMetadata: {
                ...authUser.publicMetadata,
                varify_role: appRole,
                varify_initialised: true
            }
        })
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
            const invitation = await clerkClient.organizations.createOrganizationInvitation({
                inviterUserId: this.request.userId,
                organizationId: this.request.organisationId,
                role: 'org:member',
                emailAddress: input.email,
                redirectUrl: 'http://localhost:3000/accept-invite',
                publicMetadata: {
                    'org_role': input.role
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
