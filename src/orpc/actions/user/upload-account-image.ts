'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ORPCError } from '@orpc/server';
import { z } from 'zod';

import { s3Client } from '@/lib/aws-s3.client';
import { actionContext, oa } from '@/orpc/middlewares';

const BUCKET_NAME = 'account-image';

export const uploadAccountImage = oa
  .input(
    z.object({
      file: z.instanceof(File),
      key: z.string().min(1),
    }),
  )
  .output(z.string())
  .handler(async ({ input }) => {
    const { file, key } = input;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        }),
      );
      return getImageUrl(key, BUCKET_NAME);
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to upload image to S3',
      });
    }
  })
  .actionable({
    context: actionContext,
  });

function getImageUrl(key: string, bucketName: string): string {
  return `${process.env.S3_PUBLIC_PATH}/${bucketName}/${key}`;
}
