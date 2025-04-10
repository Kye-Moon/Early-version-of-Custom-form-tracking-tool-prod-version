import {Module} from '@nestjs/common';
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {DataloaderService} from "./dataloader.service";
import {JobFormModule} from "../job-form/job-form.module";
import {JobModule} from "../job/job.module";

@Module({
    providers: [DataloaderService],
    imports: [
        DrizzleModule,
        JobFormModule,
        RequestModule,
        JobModule
    ],
    exports: [DataloaderService],
})

export class DataloaderModule {
}
