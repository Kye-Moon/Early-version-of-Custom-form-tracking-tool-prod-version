import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobFormInput {
  @Field(() => String)
  jobId: string;

  @Field(() => String)
  formTemplateId: string;
}
