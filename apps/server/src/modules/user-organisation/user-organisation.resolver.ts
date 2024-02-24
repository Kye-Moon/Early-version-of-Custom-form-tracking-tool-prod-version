import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {OrganisationService} from "../organisation/organisation.service";
import {Organisation} from "../organisation/entities/organisation.entity";
import {UserOrganisation} from './entities/user-organisation.entity';
import {User} from "../user/entities/user.entity";
import {UserService} from "../user/user.service";

@Resolver(() => UserOrganisation)
export class UserOrganisationResolver {
    constructor(
        private readonly organisationService: OrganisationService,
        private readonly userService: UserService
    ) {
    }

    @ResolveField(() => Organisation)
    async organisation(@Parent() userOrganisation: UserOrganisation) {
        return this.organisationService.findOne(userOrganisation.organisationId)
    }

    @ResolveField(() => User)
    async user(@Parent() userOrganisation: UserOrganisation) {
        return this.userService.findOne(userOrganisation.userId)
    }
}
