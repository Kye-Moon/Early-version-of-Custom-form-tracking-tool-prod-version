import {Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectResolver} from './project.resolver';
import {ProjectRepository} from "./project.repository";
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {UserModule} from "../user/user.module";
import {OrganisationModule} from "../organisation/organisation.module";
import {JobModule} from "../job/job.module";

@Module({
    providers: [ProjectResolver, ProjectRepository, ProjectService],
    exports: [ProjectService, ProjectRepository],
    imports: [
        DrizzleModule,
        RequestModule,
        UserModule,
        OrganisationModule,
        JobModule
    ]
})
export class ProjectModule {
}
