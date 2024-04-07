import {Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import {JobFormService} from './job-form.service';
import {JobForm} from './entities/job-form.entity';
import {CreateJobFormInput} from './dto/create-job-form.input';
import {UpdateJobFormInput} from './dto/update-job-form.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";
import {FormTemplate} from "../form-template/entities/form-template.entity";
import {JobRecord} from "../job-record/entities/job-record.entity";
import {FormTemplateService} from "../form-template/form-template.service";

@Resolver(() => JobForm)
export class JobFormResolver {
    constructor(
        private readonly jobFormService: JobFormService,
        private readonly formTemplateService: FormTemplateService
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => JobForm)
    createJobForm(@Args('createJobFormInput') createJobFormInput: CreateJobFormInput) {
        return this.jobFormService.create(createJobFormInput);
    }

    @Query(() => [JobForm])
    jobForms(@Args('jobId', {type: () => String}) jobId: string) {
        return this.jobFormService.findByJobId(jobId);
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => FormTemplate)
    async formTemplate(@Parent() jobForm: JobForm) {
        const {formTemplateId} = jobForm;
        return await this.formTemplateService.findOne(formTemplateId);
    }
}
