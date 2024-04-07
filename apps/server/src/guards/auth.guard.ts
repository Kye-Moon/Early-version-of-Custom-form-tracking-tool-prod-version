import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {GqlExecutionContext} from "@nestjs/graphql";
import {clerkClient} from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const authStatus = await clerkClient.authenticateRequest({
            request: ctx.getContext().request,
            secretKey: process.env.CLERK_SECRET_KEY
        });
        if (authStatus.isSignedIn) {
            const auth = authStatus.toAuth();
            ctx.getContext().req.userId = auth.userId;
            ctx.getContext().req.orgId = auth.orgId;
            ctx.getContext().req.role = auth.orgRole;
            return true
        } else {
            throw new Error('Unauthorized');
        }
    }
}

