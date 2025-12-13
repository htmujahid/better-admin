import { redirect } from 'next/navigation';

import { requireSession } from '@/orpc/actions/user/require-session';
import { requireSessions } from '@/orpc/actions/user/require-sessions';
import { AccountSessions } from '@/components/user/account-sessions';
import { TwoFactorContainer } from '@/components/user/two-factor-container';
import { UpdateAccountPasswordForm } from '@/components/user/update-account-password';
import pathsConfig from '@/config/paths.config';
import { withAuthenticate } from '@/components/acccess/with-authenticate';

async function AccountPage() {
  const [sessionsError, sessions] = await requireSessions();
  const [sessionError, response] = await requireSession();

  if (sessionsError) {
    redirect(pathsConfig.auth.signIn);
  }

  if (sessionError) {
    redirect(pathsConfig.auth.signIn);
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <UpdateAccountPasswordForm />
      <AccountSessions sessionId={response.session.id} sessions={sessions} />
      <TwoFactorContainer session={response} />
    </div>
  );
}

export default withAuthenticate(AccountPage);