import { headers } from 'next/headers';

import { ORPCError, os } from '@orpc/server';

import { auth } from '@/lib/auth';
import type { Permissions, Role } from '@/lib/auth/roles';

import { Context } from './context';

export const o = os.$context<Context>();

// Action context type for server actions
export type ActionContext = {
  headers: Headers;
};

// Base procedure for server actions (uses runtime context)
export const oa = os.$context<ActionContext>();

// Action context provider for .actionable()
export const actionContext = async (): Promise<ActionContext> => ({
  headers: await headers(),
});

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
  return o.middleware(async ({ context, next }) => {
    const data = await auth.api.getSession({
      headers: context.headers,
    });

    if (!data) {
      throw new ORPCError('UNAUTHORIZED');
    }

    if (!args?.permissions) {
      const user = data?.user;
      const userRole = user?.role?.split(',');

      if (data && (!args?.role || userRole?.includes(args?.role))) {
        return next({
          context: data,
        });
      }
      throw new ORPCError('UNAUTHORIZED');
    }

    const is = await auth.api.userHasPermission({
      body: {
        permissions: args?.permissions,
      },
      headers: await headers(),
    });
    if (is.success) {
      return next({
        context: data,
      });
    }
    throw new ORPCError('UNAUTHORIZED');
  });
}
