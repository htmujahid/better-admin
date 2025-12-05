'use server';

import { auth } from '@/lib/auth';
import { actionContext, oa } from '@/orpc/middlewares';

export const getSessions = oa
  .handler(async ({ context }) => {
    const sessions = await auth.api.listSessions({
      headers: context.headers,
    });

    return sessions;
  })
  .actionable({
    context: actionContext,
  });
