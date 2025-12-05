import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppLogo } from '@/components/app-logo';
import pathsConfig from '@/config/paths.config';
import { auth } from '@/lib/auth';

async function AuthLayout({ children }: React.PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect(pathsConfig.app.home);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <AppLogo />
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
