'use server';

import { cache } from 'react';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export async function requireSessions_() {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  if (sessions.length === 0) {
    throw new Error('No sessions found');
  }

  return sessions;
}

export const requireSessions = cache(requireSessions_);
