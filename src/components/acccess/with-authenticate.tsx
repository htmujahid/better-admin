import { redirect } from 'next/navigation';

import pathsConfig from '@/config/paths.config';
import { authenticate } from '@/lib/auth/authenticate';
import { Permissions, Role } from '@/lib/auth/roles';

type LayoutOrPageComponent<Params> = React.ComponentType<Params>;

export function withAuthenticate<Params extends object>(
  Component: LayoutOrPageComponent<Params>,
  args?:
    | {
        permissions: Permissions;
        role?: never;
      }
    | {
        role: Role;
        permissions?: never;
      },
) {
  return async function AuthenticateServerComponentWrapper(params: Params) {
    try {
      const response = await authenticate(args);

      return <Component user={response.user} {...params} />;
    } catch (error) {
      console.error(error);
      redirect(pathsConfig.auth.signIn);
    }
  };
}
