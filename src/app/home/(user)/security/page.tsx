import { UpdateAccountPasswordForm } from "../_components/update-account-password";
import { requireSession } from "../_lib/actions/require-session";
import { AccountSessions } from "../_components/account-sessions";
import { requireSessions } from "../_lib/actions/require-sessions";
import { TwoFactorContainer } from "../_components/two-factor-container";

export default async function AccountPage() {
  const sessions = await requireSessions();
  const response = await requireSession();

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <UpdateAccountPasswordForm />
      <AccountSessions sessionId={response.session.id} sessions={sessions} />
      <TwoFactorContainer session={response} />
    </div>
  )
}
