'use server';

import { cache } from 'react';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export async function getSessions_() {
  const session = await auth.api.listSessions({
    headers: await headers(),
  });

  return session;
}

export const getSessions = cache(getSessions_);
