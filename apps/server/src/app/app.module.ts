import {Module} from '@nestjs/common';
import {AppResolver} from './app.resolver';
import {AppService} from './app.service';
import {YogaDriver, YogaDriverConfig} from '@graphql-yoga/nestjs';
import {AuthModule} from '../modules/auth/auth.module';
import {LoggerModule} from 'nestjs-pino';
import {GraphQLModule} from '@nestjs/graphql';
import {UserModule} from '../modules/user/user.module';
import {DrizzleModule} from '../drizzle/drizzle.module';
import {JobModule} from '../modules/job/job.module';
import {RequestModule} from '../modules/request/request.module';
import {JobCrewModule} from "../modules/job-crew/job-crew.module";
import {JobRecordModule} from "../modules/job-record/job-record.module";
import {EmailModule} from "../modules/email/email.module";
import {SmsModule} from "../modules/sms/sms.module";
import {S3Module} from "../modules/s3/s3.module";
import {ConfigModule} from "@nestjs/config";
import {JobRecordImageModule} from "../modules/job-record-image/job-record-image.module";
import {VariationInitialDataModule} from "../modules/variation-initial-data/variation-initial-data.module";
import {VariationResourceModule} from "../modules/variation-resource/variation-resource.module";
import {JobScopeItemModule} from "../modules/job-scope-item/job-scope-item.module";
import {JobAttachmentModule} from "../modules/job-attachment/job-attachment.module";
import {CrewLogModule} from "../modules/crew-log/crew-log.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        LoggerModule.forRoot({
            pinoHttp: {
                enabled: false,
                transport: {
                    target: 'pino-pretty',
                    options: {
                        singleLine: true,
                    },
                },
            },
        }),
        GraphQLModule.forRoot<YogaDriverConfig>({
            driver: YogaDriver,
            autoSchemaFile: 'schema.graphql',
        }),
        AuthModule,
        SmsModule,
        UserModule,
        JobModule,
        JobCrewModule,
        JobRecordModule,
        JobRecordImageModule,
        VariationInitialDataModule,
        VariationResourceModule,
        DrizzleModule,
        RequestModule,
        EmailModule,
        S3Module,
        JobScopeItemModule,
        JobAttachmentModule,
        CrewLogModule,
    ],
    controllers: [AppResolver],
    providers: [AppService],
})
export class AppModule {
}
