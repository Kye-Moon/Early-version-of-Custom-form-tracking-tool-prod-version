import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User} from './entities/user.entity';
import {UpdateUserInput} from './dto/update-user.input';
import {SearchUserInput} from "./dto/search-user.input";
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";
import {OrganisationService} from "../organisation/organisation.service";
import {UserRepository} from "./user.repository";
import {UserOrganisation} from "../user-organisation/entities/user-organisation.entity";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: UserRepository,
        private readonly organisationService: OrganisationService,
        private readonly userOrganisationService: UserOrganisationService,
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => User)
    initialiseUser() {
        try {
            return this.userService.initialise();
        } catch (e) {
            console.error(e);
        }
    }

    @UseGuards(AuthGuard)
    @Query(() => [User], {name: 'searchUsers'})
    searchUsers(@Args('userSearchInput') searchInput: SearchUserInput) {
        return this.userService.search(searchInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => Boolean)
    async checkUserExists(@Args('authId', {type: () => String}) authId: string) {
        try {
            const user = await this.userRepository.findOneByAuthId(authId);
            return !!user;
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    @Query(() => User, {name: 'user'})
    findOne(@Args('id', {type: () => String}) id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Query(() => User, {name: 'currentUser'})
    currentUser() {
        return this.userService.currentUser();
    }


    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.userService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('id', {type: () => Int}) id: number) {
        return this.userService.remove(id);
    }

    @ResolveField(() => UserOrganisation)
    async userOrganisation(@Parent() user: User) {
        return await this.userOrganisationService.getCurrentUserOrganisation();
    }
}
