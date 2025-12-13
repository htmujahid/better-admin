'use server';

import { ORPCError } from '@orpc/server';

import { auth } from '@/lib/auth';
import { actionContext, oa } from '@/orpc/middlewares';

export const requireSession = oa
  .handler(async ({ context }) => {
    const session = await auth.api.getSession({
      headers: context.headers,
    });

    if (!session?.session || !session?.user) {
      throw new ORPCError('UNAUTHORIZED');
    }

    return session;
  })
  .actionable({
    context: actionContext,
  });
