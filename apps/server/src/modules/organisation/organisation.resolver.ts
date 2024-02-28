import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganisationService } from './organisation.service';
import { Organisation } from './entities/organisation.entity';
import { CreateOrganisationInput } from './dto/create-organisation.input';
import { UpdateOrganisationInput } from './dto/update-organisation.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => Organisation)
export class OrganisationResolver {
  constructor(private readonly organisationService: OrganisationService) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Organisation)
  createOrganisation(@Args('createOrganisationInput') createOrganisationInput: CreateOrganisationInput) {
    return this.organisationService.create(createOrganisationInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Organisation], { name: 'organisation' })
  findAll() {
    return this.organisationService.findAllByUserId();
  }

  @UseGuards(AuthGuard)
  @Query(() => Organisation, { name: 'organisation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.organisationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Organisation)
  updateOrganisation(@Args('updateOrganisationInput') updateOrganisationInput: UpdateOrganisationInput) {
    return this.organisationService.update(updateOrganisationInput.id, updateOrganisationInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Organisation)
  removeOrganisation(@Args('id', { type: () => Int }) id: number) {
    return this.organisationService.remove(id);
  }
}
