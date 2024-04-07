import { CreateJobFormResponseInput } from './create-job-form-response.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJobFormResponseInput extends PartialType(CreateJobFormResponseInput) {
  @Field(() => String)
  id: string;
}
