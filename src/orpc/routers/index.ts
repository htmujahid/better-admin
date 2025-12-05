import { type RouterClient } from '@orpc/server';
import { User } from 'better-auth';

import { o } from '@/orpc/context';
import { authMiddleware } from '@/orpc/middlewares';

import { todoRouter } from './todo';

export const appRouter = {
  healthCheck: o
    .route({
      method: 'GET',
      path: '/health',
      summary: 'Health Check',
      description: 'Check if the API is running',
      tags: ['System'],
    })
    .handler(() => {
      return 'OK';
    }),
  privateData: o
    .route({
      method: 'GET',
      path: '/private',
      summary: 'Get Private Data',
      description: 'Returns private data for authenticated users',
      tags: ['Auth'],
    })
    .use(authMiddleware({ role: 'user' }))
    .handler(({ context }) => {
      return {
        message: 'This is private',
        user: context?.user as User,
      };
    }),
  todo: todoRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
