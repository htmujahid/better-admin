import {
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { serializer } from './serializer';

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    }),
    defaultOptions: {
      queries: {
        queryKeyHashFn(queryKey) {
          const [json, meta] = serializer.serialize(queryKey);
          return JSON.stringify({ json, meta });
        },
        staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        serializeData(data) {
          const [json, meta] = serializer.serialize(data);
          return { json, meta };
        },
      },
      hydrate: {
        deserializeData(data: { json: unknown; meta: unknown }) {
          return serializer.deserialize(
            data.json,
            data.meta as Parameters<typeof serializer.deserialize>[1],
          );
        },
      },
    },
  });
}
