'use server';

import { auth } from '@/lib/auth';
import { actionContext, oa } from '@/orpc/middlewares';

export const getSession = oa
  .handler(async ({ context }) => {
    const session = await auth.api.getSession({
      headers: context.headers,
    });

    return session;
  })
  .actionable({
    context: actionContext,
  });
