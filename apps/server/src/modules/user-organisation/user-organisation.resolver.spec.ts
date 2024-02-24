import { Test, TestingModule } from '@nestjs/testing';
import { UserOrganisationResolver } from './user-organisation.resolver';
import { UserOrganisationService } from './user-organisation.service';

describe('UserOrganisationResolver', () => {
  let resolver: UserOrganisationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOrganisationResolver, UserOrganisationService],
    }).compile();

    resolver = module.get<UserOrganisationResolver>(UserOrganisationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
