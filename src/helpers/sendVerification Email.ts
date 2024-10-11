import {resend} from '../lib/resend'
import VerificationEmail from '../../emails/verificationEmail';
import { apiResponse } from '@/types/apiResponse';

export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string
): Promise<apiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return{
            success:true,
            message:"Verification email"
        }
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {
            success:false,
            message:"Error sending verification email"
        }
    }
}