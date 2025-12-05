'use server';

import { ORPCError } from '@orpc/server';

import { auth } from '@/lib/auth';
import { actionContext, oa } from '@/orpc/middlewares';

export const requireSessions = oa
  .handler(async ({ context }) => {
    const sessions = await auth.api.listSessions({
      headers: context.headers,
    });

    if (sessions.length === 0) {
      throw new ORPCError('NOT_FOUND', { message: 'No sessions found' });
    }

    return sessions;
  })
  .actionable({
    context: actionContext,
  });
