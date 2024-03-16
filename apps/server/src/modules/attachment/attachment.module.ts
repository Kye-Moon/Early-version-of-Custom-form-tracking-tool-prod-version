import {Module} from '@nestjs/common';
import {AttachmentService} from './attachment.service';
import {AttachmentResolver} from './attachment.resolver';
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {AttachmentRepository} from "./attachment.repository";

@Module({
    providers: [AttachmentResolver, AttachmentService, AttachmentRepository],
    imports: [
        DrizzleModule,
        RequestModule,
    ],
    exports: [AttachmentService, AttachmentRepository],
})
export class AttachmentModule {
}
