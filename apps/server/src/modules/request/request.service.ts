import {Inject} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';

export class RequestService {
    constructor(@Inject(REQUEST) private request: any) {
    }

    get userId(): any {
        return this.request.req.userId;
    }

    get organisationId(): any {
        return this.request.req.orgId;
    }

    get role(): any {
        return this.request.req.role;
    }
}
