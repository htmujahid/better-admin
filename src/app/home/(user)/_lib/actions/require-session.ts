'use server';

import { cache } from 'react';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export async function requireSession_() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export const requireSession = cache(requireSession_);
