import { Test, TestingModule } from '@nestjs/testing';
import { JobFormResolver } from './job-form.resolver';
import { JobFormService } from './job-form.service';

describe('JobFormResolver', () => {
  let resolver: JobFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFormResolver, JobFormService],
    }).compile();

    resolver = module.get<JobFormResolver>(JobFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
