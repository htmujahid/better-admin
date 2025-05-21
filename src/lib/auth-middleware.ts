import { headers } from 'next/headers';

import { createMiddleware } from 'next-safe-action';

import { auth } from './auth';
import type { Permissions, Role } from './roles';

export function authMiddleware(
  args?:
    | {
        permissions: Permissions;
        role?: never;
      }
    | {
        role: Role;
        permissions?: never;
      },
) {
  return createMiddleware().define(async ({ next }) => {
    if (!args?.permissions) {
      const data = await auth.api.getSession({
        headers: await headers(),
      });

      const user = data?.user;
      const userRole = user?.role?.split(',');

      if (!args?.role || userRole?.includes(args?.role)) {
        return next({
          ctx: {
            user,
          },
        });
      }
      throw new Error('Unauthorized');
    }

    const is = await auth.api.userHasPermission({
      body: {
        permissions: args?.permissions,
      },
      headers: await headers(),
    });
    if (is.success) {
      return next();
    }
    throw new Error('Unauthorized');
  });
}
