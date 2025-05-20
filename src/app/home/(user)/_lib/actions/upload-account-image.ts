'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '@/lib/aws-s3.client';

const BUCKET_NAME = 'account-image';

export async function uploadAccountImage(data: FormData) {
  const file = data.get('file') as File;
  const key = data.get('key') as string;

  if (!file || !key) {
    throw new Error('Missing file, key, or bucket name');
  }

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
    throw new Error('Failed to upload image to S3');
  }
}

export async function getImageUrl(
  key: string,
  bucketName: string,
): Promise<string> {
  return `${process.env.S3_PUBLIC_PATH}/${bucketName}/${key}`;
}
