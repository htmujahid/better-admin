'use client';

import { useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { createQueryClient } from '@/lib/query/client';

export function ReactQueryProvider(props: React.PropsWithChildren) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
