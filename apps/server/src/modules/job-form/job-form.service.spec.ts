import { Test, TestingModule } from '@nestjs/testing';
import { JobFormService } from './job-form.service';

describe('JobFormService', () => {
  let service: JobFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobFormService],
    }).compile();

    service = module.get<JobFormService>(JobFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
