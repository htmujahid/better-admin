'use server';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { z } from 'zod';

import { s3Client } from '@/lib/aws-s3.client';
import { actionContext, oa } from '@/orpc/middlewares';

const BUCKET_NAME = 'account-image';

export const deleteAccountImage = oa
  .input(z.object({ key: z.string().min(1) }))
  .handler(async ({ input }) => {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: input.key,
      }),
    );
  })
  .actionable({
    context: actionContext,
  });
