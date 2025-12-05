import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, openAPI, twoFactor } from 'better-auth/plugins';

import authConfig from '@/config/auth.config';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { ac, allRoles } from '@/lib/auth/roles';
import { sendMail } from '@/lib/mailer';

export const auth = betterAuth({
  authConfig,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: 'Reset Password',
        html: `
          <p>Hi ${user.name},</p>
          <p>Click <a href="${url}">here</a> to reset your password</p>
          <p>Or copy and paste the link below into your browser:</p>
          <p>${url}</p>
        `,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      requireVerification: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendMail({
          to: user.email,
          subject: 'Change Email',
          html: `
            <p>Hi ${user.name},</p>
            <p>Click <a href="${url}">here</a> to change your email to ${newEmail}</p>
            <p>Or copy and paste the link below into your browser:</p>
            <p>${url}</p>
          `,
        });
      },
    },
    deleteUser: {
      enabled: true,
      deleteSessions: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendMail({
          to: user.email,
          subject: 'Delete Account',
          html: `
            <p>Hi ${user.name},</p>
            <p>Click <a href="${url}">here</a> to delete your account</p>
            <p>Or copy and paste the link below into your browser:</p>
            <p>${url}</p>
          `,
        });
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: 'Verify Email',
        html: `
          <p>Hi ${user.name},</p>
          <p>Click <a href="${url}">here</a> to verify your email</p>
          <p>Or copy and paste the link below into your browser:</p>
          <p>${url}</p>
        `,
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  plugins: [
    admin({
      ac,
      roles: allRoles,
    }),
    twoFactor({
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          await sendMail({
            to: user.email,
            subject: 'OTP',
            html: `
              <p>Hi ${user.name},</p>
              <p>Your OTP is ${otp}</p>
            `,
          });
        },
      },
    }),
    openAPI({}),
    nextCookies(),
  ],
});
