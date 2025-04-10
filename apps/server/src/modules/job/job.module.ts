import {forwardRef, Module} from '@nestjs/common';
import {JobService} from './job.service';
import {JobResolver} from './job.resolver';
import {JobRepository} from './job.repository';
import {DrizzleModule} from '../../drizzle/drizzle.module';
import {RequestModule} from '../request/request.module';
import {JobCrewModule} from "../job-crew/job-crew.module";
import {JobRecordModule} from "../job-record/job-record.module";
import {JobScopeItemModule} from "../job-scope-item/job-scope-item.module";
import {AttachmentModule} from "../attachment/attachment.module";
import {UserModule} from "../user/user.module";
import {OrganisationModule} from "../organisation/organisation.module";
import {ProjectModule} from "../project/project.module";
import {JobFormModule} from "../job-form/job-form.module";
import {FormTemplateModule} from "../form-template/form-template.module";

@Module({
    providers: [JobResolver, JobService, JobRepository],
    imports: [
        DrizzleModule,
        forwardRef(() => ProjectModule),
        RequestModule,
        forwardRef(() => JobCrewModule),
        JobRecordModule,
        JobScopeItemModule,
        AttachmentModule,
        UserModule,
        OrganisationModule,
        JobFormModule,
        FormTemplateModule,
    ],
    exports: [JobService, JobRepository],
})
export class JobModule {
}
