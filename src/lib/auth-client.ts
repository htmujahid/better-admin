import { adminClient, twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { ac, allRoles } from './roles';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  plugins: [
    adminClient({
      ac,
      roles: allRoles,
    }),
    twoFactorClient(),
  ],
});
