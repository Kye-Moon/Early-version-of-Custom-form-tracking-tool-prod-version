import { Module } from '@nestjs/common';
import { JobFormResponseService } from './job-form-response.service';
import { JobFormResponseResolver } from './job-form-response.resolver';
import {JobFormResponseRepository} from "./job-form-response.repository";
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";

@Module({
  providers: [JobFormResponseResolver, JobFormResponseService, JobFormResponseRepository],
    imports: [
        DrizzleModule,
        RequestModule,
    ],
  exports: [JobFormResponseService, JobFormResponseRepository],
})
export class JobFormResponseModule {}
