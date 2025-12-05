import type { NextRequest } from 'next/server';

import { os } from '@orpc/server';

export async function createContext(req: NextRequest) {
  return {
    headers: req.headers,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const o = os.$context<Context>();
