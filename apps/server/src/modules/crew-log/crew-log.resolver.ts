import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CrewLogService} from './crew-log.service';
import {CrewLog} from './entities/crew-log.entity';
import {CreateCrewLogInput} from './dto/create-crew-log.input';
import {UpdateCrewLogInput} from './dto/update-crew-log.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => CrewLog)
export class CrewLogResolver {
    constructor(private readonly crewLogService: CrewLogService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => CrewLog)
    createCrewLog(@Args('createCrewLogInput') createCrewLogInput: CreateCrewLogInput) {
        return this.crewLogService.create(createCrewLogInput);
    }

    @Query(() => [CrewLog], {name: 'crewLog'})
    findAll() {
        return this.crewLogService.findAll();
    }

    @Query(() => CrewLog, {name: 'crewLog'})
    findOne(@Args('id', {type: () => Int}) id: number) {
        return this.crewLogService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => CrewLog)
    async updateCrewLog(@Args('updateCrewLogInput') updateCrewLogInput: UpdateCrewLogInput) {
        return await this.crewLogService.update(updateCrewLogInput.id, updateCrewLogInput);
    }

    @Mutation(() => CrewLog)
    removeCrewLog(@Args('id', {type: () => Int}) id: number) {
        return this.crewLogService.remove(id);
    }
}
