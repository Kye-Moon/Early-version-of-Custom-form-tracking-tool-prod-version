import {Module} from '@nestjs/common';
import {JobCrewService} from './job-crew.service';
import {JobCrewResolver} from './job-crew.resolver';
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {JobCrewRepository} from "./job-crew.repository";
import {UserModule} from "../user/user.module";
import {UserOrganisationModule} from "../user-organisation/user-organisation.module";

@Module({
    providers: [JobCrewResolver, JobCrewService, JobCrewRepository],
    imports: [
        DrizzleModule,
        RequestModule,
        UserModule,
        UserOrganisationModule,
    ],
    exports: [JobCrewService, JobCrewRepository],
})
export class JobCrewModule {
}
