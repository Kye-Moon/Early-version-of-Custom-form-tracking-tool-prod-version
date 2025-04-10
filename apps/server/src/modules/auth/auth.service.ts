import {Injectable} from '@nestjs/common';
import {UserRepository} from "../user/user.repository";
import {OrganisationRepository} from "../organisation/organisation.repository";
import {SignUpInput} from "./dto/sign-up.input";
import {RequestService} from "../request/request.service";
import clerkClient from "@clerk/clerk-sdk-node";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";
import {SignUpResponse} from "./entities/sign-up.response";

@Injectable()
export class AuthService {
    constructor(
        private readonly request: RequestService,
        private readonly userRepository: UserRepository,
        private readonly userOrganisationService: UserOrganisationService,
        private readonly organisationRepository: OrganisationRepository,
    ) {
    }

    // When a user signs up, they will also create an ORG and a USER in the database
    async signUp(signUpInput: SignUpInput): Promise<SignUpResponse> {
        const authUser = await clerkClient.users.getUser(this.request.userId)
        if (!authUser) {
            throw new Error("User not found");
        }

        try {
            const user = await this.userRepository.createUser({
                name: signUpInput.firstName + " " + signUpInput.lastName,
                email: signUpInput.email,
                authId: authUser.id,
                status: "ACTIVE",
            });

            // Create ORG in DB and in AuthService
            const authOrg = await clerkClient.organizations.createOrganization({
                name: signUpInput.organizationName,
                slug: signUpInput.organizationName.toLowerCase().replace(/\s/g, '-'),
                createdBy: this.request.userId,
            });
            const organisation = await this.organisationRepository.create({
                name: signUpInput.organizationName,
                authId: authOrg.id,
            });

            // Create USER ORG in DB
            await this.userOrganisationService.create({
                userId: user.id,
                organisationId: organisation.id,
                role: 'ADMIN'
            });

            return {
                authOrgId: authOrg.id
            }
        } catch (e) {
            await clerkClient.users.deleteUser(authUser.id);
        }
    }
}
