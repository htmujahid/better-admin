import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';

import { appRouter } from '@/orpc/routers';

const generator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function generateOpenAPISpec() {
  return generator.generate(appRouter, {
    info: {
      title: 'Next Bard API',
      version: '1.0.0',
      description:
        'API documentation for Next Bard - A modern admin dashboard built with Next.js',
    },
    servers: [
      {
        url: '/api/rpc',
        description: 'API Server',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  });
}
