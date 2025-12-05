import { BetterAuthOptions } from 'better-auth';

import appConfig from './app.config';

export default {
  appName: appConfig.name,
  baseURL: appConfig.url,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  rateLimit: {
    enabled: true,
    storage: 'database',
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
} as Pick<
  BetterAuthOptions,
  'appName' | 'baseURL' | 'socialProviders' | 'rateLimit' | 'trustedOrigins'
>;
