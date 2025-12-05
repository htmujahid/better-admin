import { z } from 'zod';

const PathsSchema = z.object({
  auth: z.object({
    signIn: z.string().min(1),
    signUp: z.string().min(1),
    forgotPassword: z.string().min(1),
    resetPassword: z.string().min(1),
    twoFactor: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    account: z.string().min(1),
    security: z.string().min(1),
    preferences: z.string().min(1),
  }),
  admin: z.object({
    root: z.string().min(1),
    users: z.string().min(1),
  }),
});

const pathsConfig = PathsSchema.parse({
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    twoFactor: '/auth/two-factor',
  },
  app: {
    home: '/home',
    account: '/home/account',
    security: '/home/security',
    preferences: '/home/preferences',
  },
  admin: {
    root: '/admin',
    users: '/admin/users',
  },
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
