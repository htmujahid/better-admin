import { UpdateAccountEmailForm } from "../_components/update-account-email-form";
import { UpdateAccountDetailsForm } from "../_components/update-account-details-form";
import { UpdateAccountImage } from "../_components/update-account-image";
import { AccountDangerZone } from "../_components/account-danger-zone";
import { AccountRoles } from "../_components/account-roles";
import { requireSession } from "../_lib/actions/require-session";

export default async function AccountPage() {
  const response = await requireSession();

  const user = response.user;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <UpdateAccountImage />
      <UpdateAccountDetailsForm />
      <UpdateAccountEmailForm email={user.email} />
      <AccountRoles roles={user.role?.split(',') ?? []} />
      <AccountDangerZone />
    </div>
  )
}
