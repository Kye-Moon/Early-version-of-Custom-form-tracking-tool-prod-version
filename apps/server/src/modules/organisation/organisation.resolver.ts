import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganisationService } from './organisation.service';
import { Organisation } from './entities/organisation.entity';
import { CreateOrganisationInput } from './dto/create-organisation.input';
import { UpdateOrganisationInput } from './dto/update-organisation.input';

@Resolver(() => Organisation)
export class OrganisationResolver {
  constructor(private readonly organisationService: OrganisationService) {}

  @Mutation(() => Organisation)
  createOrganisation(@Args('createOrganisationInput') createOrganisationInput: CreateOrganisationInput) {
    return this.organisationService.create(createOrganisationInput);
  }

  @Query(() => [Organisation], { name: 'organisation' })
  findAll() {
    return this.organisationService.findAllByUserId();
  }

  @Query(() => Organisation, { name: 'organisation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.organisationService.findOne(id);
  }

  @Mutation(() => Organisation)
  updateOrganisation(@Args('updateOrganisationInput') updateOrganisationInput: UpdateOrganisationInput) {
    return this.organisationService.update(updateOrganisationInput.id, updateOrganisationInput);
  }

  @Mutation(() => Organisation)
  removeOrganisation(@Args('id', { type: () => Int }) id: number) {
    return this.organisationService.remove(id);
  }
}
