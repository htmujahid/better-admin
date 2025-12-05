'use client';

import { useCallback } from 'react';

import { toast } from 'sonner';

import { deleteAccountImage } from '@/actions/user/delete-account-image';
import { uploadAccountImage } from '@/actions/user/upload-account-image';
import { ImageUploader } from '@/components/image-uploader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth/auth-client';

export function UpdateAccountImage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Update your profile picture below.</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadProfileAvatarForm
          imageUrl={user?.image ?? null}
          userId={user?.id ?? ''}
          onAvatarUpdated={() => console.log('avatar updated')}
        />
      </CardContent>
    </Card>
  );
}

function UploadProfileAvatarForm(props: {
  imageUrl: string | null;
  userId: string;
  onAvatarUpdated: () => void;
}) {
  const createToaster = useCallback((promise: () => Promise<unknown>) => {
    return toast.promise(promise, {
      success: 'Profile picture updated',
      error: 'Failed to update profile picture',
      loading: 'Updating profile picture',
    });
  }, []);

  const onValueChange = useCallback(
    (file: File | null) => {
      const removeExistingStorageFile = async () => {
        if (props.imageUrl) {
          const key = props.imageUrl.split('/').pop();

          if (key) {
            const [error] = await deleteAccountImage({ key });
            if (error) {
              console.error('Failed to delete existing image:', error.message);
            }
          }
        }
      };

      if (file) {
        const promise = async () => {
          await removeExistingStorageFile();
          const extension = file.name.split('.').pop();
          const key = getAvatarFileName(props.userId, extension);

          const [error, imageUrl] = await uploadAccountImage({ file, key });

          if (error) {
            throw new Error(error.message);
          }

          await authClient.updateUser({
            image: imageUrl,
          });
          props.onAvatarUpdated();
        };

        createToaster(promise);
      } else {
        const promise = async () => {
          await removeExistingStorageFile();
          await authClient.updateUser({
            image: null,
          });
          props.onAvatarUpdated();
        };

        createToaster(promise);
      }
    },
    [createToaster, props],
  );

  return (
    <ImageUploader value={props.imageUrl} onValueChange={onValueChange}>
      <div className={'flex flex-col space-y-1'}>
        <span className={'text-sm'}>Profile Picture</span>
        <span className={'text-xs'}>Profile Picture</span>
      </div>
    </ImageUploader>
  );
}

function getAvatarFileName(userId: string, extension: string | undefined) {
  return `${userId}.${extension}`;
}
