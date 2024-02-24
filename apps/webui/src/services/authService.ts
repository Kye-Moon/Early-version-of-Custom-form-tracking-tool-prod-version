// import {graphql} from "../../../../packages/gql-types";
// import {VerifyCodeInput} from "server/dist/src/modules/auth/dto/verifyCode.input";
// import {ResetPasswordInput} from "server/dist/src/modules/auth/dto/reset-password.input";
//
// export const loginMutation = graphql(`
// 	mutation LoginMutation($input: LoginInput!) {
// 		login(loginUserInput: $input) {
// 			access_token
// 		}
// 	}
// `);
//
// export const signupMutation = graphql(`
// 	mutation SignUpMutation($input: SignUpInput!) {
// 		signup(signupInput: $input) {
// 			access_token
// 		}
// 	}
// `);
//
// export const getOTP = graphql(`
//     mutation GetOTP($email: String!) {
//         requestVerificationCode(email: $email) {
//             msg
//             phone
// 			email
//         }
//     }
// `);
//
// export const verifyOTP = graphql(`
// 	mutation VerifyOTP($input: VerifyCodeInput!) {
// 		verifyOTP(input: $input) {
// 			reset_password_token
// 		}
// 	}
// `);
//
//
// export const resetPassword = graphql(`
// 	mutation ResetPassword($input: ResetPasswordInput!) {
// 		resetPassword(input: $input) {
// 			access_token
// 		}
// 	}
// `);
