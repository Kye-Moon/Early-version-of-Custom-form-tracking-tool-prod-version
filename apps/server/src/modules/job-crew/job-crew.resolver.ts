import {Args, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {JobCrewService} from './job-crew.service';
import {JobCrewMember} from './entities/job-crew.entity';
import {UserOrganisation} from "../user-organisation/entities/user-organisation.entity";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";

@Resolver(() => JobCrewMember)
export class JobCrewResolver {
    constructor(
        private readonly jobCrewService: JobCrewService,
        private readonly userOrganisationService: UserOrganisationService
    ) {
    }

    /**
     * Query to get all job crew members
     * @param id
     */
    @Query(() => [JobCrewMember], {name: 'jobCrew'})
    findAll(@Args('jobId', {type: () => String}) id: string) {
        return this.jobCrewService.findAll(id);
    }

    @ResolveField(() => UserOrganisation)
    async userOrganisation(@Parent() crewMember: JobCrewMember) {
        const {id} = crewMember;
        return this.userOrganisationService.getCurrentUserOrganisationByUserId(id);
    }
}
