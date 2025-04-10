import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {UserOrganisationModule} from "../user-organisation/user-organisation.module";
import {OrganisationModule} from "../organisation/organisation.module";
import {UserModule} from "../user/user.module";

@Module({
  providers: [AuthResolver, AuthService],
  imports: [
      DrizzleModule,
      RequestModule,
      UserModule,
      OrganisationModule,
      UserOrganisationModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
