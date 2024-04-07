import { Test, TestingModule } from '@nestjs/testing';
import { JobFormResponseService } from './job-form-response.service';

describe('JobFormResponseService', () => {
  let service: JobFormResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFormResponseService],
    }).compile();

    service = module.get<JobFormResponseService>(JobFormResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
