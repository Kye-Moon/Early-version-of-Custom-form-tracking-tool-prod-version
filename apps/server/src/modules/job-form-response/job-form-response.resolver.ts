import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobFormResponseService } from './job-form-response.service';
import { JobFormResponse } from './entities/job-form-response.entity';
import { CreateJobFormResponseInput } from './dto/create-job-form-response.input';
import { UpdateJobFormResponseInput } from './dto/update-job-form-response.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => JobFormResponse)
export class JobFormResponseResolver {
  constructor(private readonly jobFormResponseService: JobFormResponseService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => JobFormResponse)
  createJobFormResponse(@Args('createJobFormResponseInput') createJobFormResponseInput: CreateJobFormResponseInput) {
    return this.jobFormResponseService.create(createJobFormResponseInput);
  }

  // @Query(() => [JobFormResponse], { name: 'jobFormResponse' })
  // findAll() {
  //   return this.jobFormResponseService.findAll();
  // }
  //
  // @Query(() => JobFormResponse, { name: 'jobFormResponse' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.jobFormResponseService.findOne(id);
  // }
  //
  // @Mutation(() => JobFormResponse)
  // updateJobFormResponse(@Args('updateJobFormResponseInput') updateJobFormResponseInput: UpdateJobFormResponseInput) {
  //   return this.jobFormResponseService.update(updateJobFormResponseInput.id, updateJobFormResponseInput);
  // }
  //
  // @Mutation(() => JobFormResponse)
  // removeJobFormResponse(@Args('id', { type: () => Int }) id: number) {
  //   return this.jobFormResponseService.remove(id);
  // }
}
