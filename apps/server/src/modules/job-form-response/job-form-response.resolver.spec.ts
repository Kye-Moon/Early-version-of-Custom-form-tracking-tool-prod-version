import { Test, TestingModule } from '@nestjs/testing';
import { JobFormResponseResolver } from './job-form-response.resolver';
import { JobFormResponseService } from './job-form-response.service';

describe('JobFormResponseResolver', () => {
  let resolver: JobFormResponseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFormResponseResolver, JobFormResponseService],
    }).compile();

    resolver = module.get<JobFormResponseResolver>(JobFormResponseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
