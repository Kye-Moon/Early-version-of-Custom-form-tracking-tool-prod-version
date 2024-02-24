import {forwardRef, Module} from '@nestjs/common';
import {JobService} from './job.service';
import {JobResolver} from './job.resolver';
import {JobRepository} from './job.repository';
import {DrizzleModule} from '../../drizzle/drizzle.module';
import {RequestModule} from '../request/request.module';
import {JobCrewModule} from "../job-crew/job-crew.module";
import {JobRecordModule} from "../job-record/job-record.module";
import {JobScopeItemModule} from "../job-scope-item/job-scope-item.module";
import {JobAttachmentModule} from "../job-attachment/job-attachment.module";
import {UserModule} from "../user/user.module";
import {OrganisationModule} from "../organisation/organisation.module";

@Module({
    providers: [JobResolver, JobService, JobRepository],
    imports: [DrizzleModule, RequestModule, forwardRef(() => JobCrewModule), JobRecordModule, JobScopeItemModule, JobAttachmentModule, UserModule, OrganisationModule],
    exports: [JobService, JobRepository],
})
export class JobModule {
}
