import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {AuthGuard} from "../../guards/auth.guard";
import {UseGuards} from "@nestjs/common";
import {SignUpInput} from "./dto/sign-up.input";
import {GraphQLError} from "graphql/error";
import {SignUpResponse} from "./entities/sign-up.response";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => SignUpResponse)
    async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
        try {
            return await this.authService.signUp(signUpInput);
        } catch (e) {
            console.log(e)
            throw new GraphQLError("Error signing up");
        }
    }
}
