import {Module} from '@nestjs/common';
import {JobFormService} from './job-form.service';
import {JobFormResolver} from './job-form.resolver';
import {JobFormRepository} from "./job-form.repository";
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {FormTemplateModule} from "../form-template/form-template.module";

@Module({
    providers: [JobFormResolver, JobFormService, JobFormRepository],
    imports: [
        DrizzleModule,
        FormTemplateModule
    ],
    exports: [JobFormService, JobFormRepository]
})
export class JobFormModule {
}
