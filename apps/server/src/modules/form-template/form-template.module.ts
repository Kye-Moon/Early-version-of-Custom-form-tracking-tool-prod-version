import {Module} from '@nestjs/common';
import {FormTemplateService} from './form-template.service';
import {FormTemplateResolver} from './form-template.resolver';
import {FormTemplateRepository} from "./form-template.repository";
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {OrganisationModule} from "../organisation/organisation.module";
import {RequestModule} from "../request/request.module";

@Module({
    providers: [FormTemplateResolver, FormTemplateService, FormTemplateRepository],
    imports: [DrizzleModule, OrganisationModule, RequestModule],
    exports: [FormTemplateService, FormTemplateRepository]
})
export class FormTemplateModule {
}
