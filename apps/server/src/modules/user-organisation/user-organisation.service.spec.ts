import { Test, TestingModule } from '@nestjs/testing';
import { UserOrganisationService } from './user-organisation.service';

describe('UserOrganisationService', () => {
  let service: UserOrganisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOrganisationService],
    }).compile();

    service = module.get<UserOrganisationService>(UserOrganisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
