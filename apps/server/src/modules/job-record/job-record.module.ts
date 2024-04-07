import {forwardRef, Module} from '@nestjs/common';
import {JobRecordService} from './job-record.service';
import {JobRecordResolver} from './job-record.resolver';
import {JobRecordRepository} from "./job-record.repository";
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {JobModule} from "../job/job.module";
import {JobRecordImageModule} from "../job-record-image/job-record-image.module";
import {VariationInitialDataModule} from "../variation-initial-data/variation-initial-data.module";
import {JobScopeItemModule} from "../job-scope-item/job-scope-item.module";
import {UserModule} from "../user/user.module";
import {OrganisationModule} from "../organisation/organisation.module";
import {FormTemplateModule} from "../form-template/form-template.module";
import {JobFormModule} from "../job-form/job-form.module";
import {JobFormResponseModule} from "../job-form-response/job-form-response.module";

@Module({
    providers: [JobRecordResolver, JobRecordService, JobRecordRepository],
    imports: [
        DrizzleModule,
        RequestModule,
        forwardRef(() => JobModule),
        JobRecordImageModule,
        VariationInitialDataModule,
        JobScopeItemModule,
        UserModule,
        OrganisationModule,
        FormTemplateModule,
        JobFormModule,
        JobFormResponseModule,
    ],

    exports: [JobRecordService, JobRecordRepository],
})
export class JobRecordModule {
}
