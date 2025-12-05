'use server';

import { headers } from 'next/headers';

import { getSession } from '@/actions/user/get-session';

import { auth } from '.';
import { Permissions, Role } from './roles';

export async function authenticate(
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
  const [error, data] = await getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!args?.permissions) {
    const user = data?.user;
    const userRole = user?.role?.split(',');

    if (!args?.role || userRole?.includes(args?.role)) {
      return {
        success: true,
        user,
      };
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
    return {
      success: true,
      user: data?.user,
    };
  }
  throw new Error('Unauthorized');
}
