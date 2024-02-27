// import {Injectable} from '@nestjs/common';
// import {TwilioService} from "nestjs-twilio";
// import {ConfigService} from "@nestjs/config";
// import {Twilio} from "twilio";
//
// @Injectable()
// export class SmsService {
//     private twilioClient: Twilio;
//
//     public constructor(
//         private readonly twilioService: TwilioService,
//         private readonly configService: ConfigService,
//     ) {
//         const accountSid = configService.get('TWILIO_ACCOUNT_SID');
//         const authToken = configService.get('TWILIO_AUTH_TOKEN');
//
//         this.twilioClient = new Twilio(accountSid, authToken);
//     }
//
//     async SendInviteSMS({phoneNumber, tempPassword, email, inviterOrgName, inviterName}: {
//         phoneNumber: string,
//         tempPassword: string,
//         email: string,
//         inviterName: string,
//         inviterOrgName: string
//     }):Promise<any> {
//         return this.twilioService.client.messages.create({
//             body: `${inviterName} from ${inviterOrgName} has invited you to join the Varify app. Your temporary password is ${tempPassword}. Please login to the app and change your password. Your email is ${email}`,
//             from: "+19044743692",
//             to: phoneNumber,
//         });
//     }
//
//     async sendOtp(phoneNumber: string) {
//         const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
//         console.log(serviceSid);
//         let msg = '';
//         await this.twilioClient.verify.v2
//             .services(serviceSid)
//             .verifications.create({ to: phoneNumber, channel: 'sms' })
//             .then((verification) => (msg = verification.status));
//         return { msg: msg };
//     }
//
//     async verifyOtp(phoneNumber: string, code: string) {
//         const serviceSid = this.configService.get(
//             'TWILIO_VERIFICATION_SERVICE_SID',
//         );
//         let msg = '';
//         await this.twilioClient.verify.v2
//             .services(serviceSid)
//             .verificationChecks.create({ to: phoneNumber, code: code })
//             .then((verification) => (msg = verification.status));
//         return { msg: msg };
//     }
//
//
//
// }
