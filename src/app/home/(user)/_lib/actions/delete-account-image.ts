'use server';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '@/lib/aws-s3.client';

const BUCKET_NAME = 'account-image';

export async function deleteAccountImage(data: { key: string }) {
  const { key } = data;

  if (!key) {
    throw new Error('Missing key');
  }

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }),
  );
}
