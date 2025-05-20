import { NextResponse } from 'next/server';

import { type MiddlewareConfig, createNEMO } from '@rescale/nemo';
import { getSessionCookie } from 'better-auth/cookies';

import appConfig from './config/app.config';
import pathsConfig from './config/paths.config';

const middlewares: MiddlewareConfig = {
  '/auth/:slug*': [
    async (request) => {
      const sessionCookie = getSessionCookie(request);

      if (sessionCookie) {
        return NextResponse.redirect(
          new URL(pathsConfig.app.home, appConfig.url),
        );
      }

      return NextResponse.next();
    },
  ],
  '/home/:slug*': [
    async (request) => {
      const sessionCookie = getSessionCookie(request);

      if (!sessionCookie) {
        return NextResponse.redirect(
          new URL(pathsConfig.auth.signIn, appConfig.url),
        );
      }

      return NextResponse.next();
    },
  ],
  '/admin/:slug*': [
    async (request) => {
      const sessionCookie = getSessionCookie(request);

      if (!sessionCookie) {
        return NextResponse.redirect(
          new URL(pathsConfig.auth.signIn, appConfig.url),
        );
      }

      return NextResponse.next();
    },
  ],
};

export const middleware = createNEMO(middlewares);

export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};
