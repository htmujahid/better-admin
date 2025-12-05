import { ApiReference } from '@scalar/nextjs-api-reference';

export const GET = ApiReference({
  pageTitle: 'Next Bard API Documentation',
  theme: 'default',
  sources: [
    {
      url: '/api/spec.json',
      title: 'RPC',
    },
    {
      url: '/api/auth/open-api/generate-schema',
      title: 'Auth',
    },
  ],
});
