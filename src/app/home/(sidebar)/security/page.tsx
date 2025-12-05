import { requireSession } from '@/actions/user/require-session';
import { requireSessions } from '@/actions/user/require-sessions';
import { AccountSessions } from '@/components/user/account-sessions';
import { TwoFactorContainer } from '@/components/user/two-factor-container';
import { UpdateAccountPasswordForm } from '@/components/user/update-account-password';

export default async function AccountPage() {
  const [sessionsError, sessions] = await requireSessions();
  const [sessionError, response] = await requireSession();

  if (sessionsError) {
    throw new Error(sessionsError.message);
  }

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <UpdateAccountPasswordForm />
      <AccountSessions sessionId={response.session.id} sessions={sessions} />
      <TwoFactorContainer session={response} />
    </div>
  );
}
