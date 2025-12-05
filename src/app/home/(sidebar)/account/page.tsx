import { requireSession } from '@/actions/user/require-session';
import { AccountDangerZone } from '@/components/user/account-danger-zone';
import { AccountRoles } from '@/components/user/account-roles';
import { UpdateAccountDetailsForm } from '@/components/user/update-account-details-form';
import { UpdateAccountEmailForm } from '@/components/user/update-account-email-form';
import { UpdateAccountImage } from '@/components/user/update-account-image';

export default async function AccountPage() {
  const [error, response] = await requireSession();

  if (error) {
    throw new Error(error.message);
  }

  const user = response.user;

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <UpdateAccountImage />
      <UpdateAccountDetailsForm />
      <UpdateAccountEmailForm email={user.email} />
      <AccountRoles roles={user.role?.split(',') ?? []} />
      <AccountDangerZone />
    </div>
  );
}
