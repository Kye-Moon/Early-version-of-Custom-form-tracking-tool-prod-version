import { CreateJobFormInput } from './create-job-form.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJobFormInput extends PartialType(CreateJobFormInput) {
  @Field(() => Int)
  id: number;
}
