import { Test, TestingModule } from '@nestjs/testing';
import { FormTemplateResolver } from './form-template.resolver';
import { FormTemplateService } from './form-template.service';

describe('FormTemplateResolver', () => {
  let resolver: FormTemplateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormTemplateResolver, FormTemplateService],
    }).compile();

    resolver = module.get<FormTemplateResolver>(FormTemplateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
