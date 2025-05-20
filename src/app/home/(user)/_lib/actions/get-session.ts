'use server';

import { cache } from 'react';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export async function getSession_() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export const getSession = cache(getSession_);
