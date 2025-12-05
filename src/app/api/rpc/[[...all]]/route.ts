import { NextRequest } from 'next/server';

import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';

import { createContext } from '@/orpc/context';
import { appRouter } from '@/orpc/routers';

const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

async function handleRequest(req: NextRequest) {
  const context = await createContext(req);

  // Try OpenAPI handler first (REST-style routes like GET /api/rpc/health)
  const apiResult = await apiHandler.handle(req, {
    prefix: '/api/rpc',
    context,
  });
  if (apiResult.response) return apiResult.response;

  // Fall back to RPC handler (RPC-style calls like POST /api/rpc/healthCheck)
  const rpcResult = await rpcHandler.handle(req, {
    prefix: '/api/rpc',
    context,
  });
  if (rpcResult.response) return rpcResult.response;

  return new Response('Not found', { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
