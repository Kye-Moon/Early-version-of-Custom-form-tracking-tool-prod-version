import {forwardRef, Module} from '@nestjs/common';
import {UserOrganisationService} from './user-organisation.service';
import {UserOrganisationResolver} from './user-organisation.resolver';
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {UserOrganisationRepository} from "./user-organisation.repository";
import {UserModule} from "../user/user.module";
import {OrganisationModule} from "../organisation/organisation.module";

@Module({
    providers: [UserOrganisationResolver, UserOrganisationService, UserOrganisationRepository],
    imports: [
        DrizzleModule,
        RequestModule,
        forwardRef(() => UserModule),
        OrganisationModule
    ],
    exports: [UserOrganisationService, UserOrganisationRepository]
})
export class UserOrganisationModule {
}
