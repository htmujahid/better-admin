import { auth } from "@/lib/auth";
import { UserSessions } from "../../_components/user-sessions";
import { cookies, headers } from "next/headers";

export default async function UserPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('better-auth.session_token')?.value.split('.')[0];

  const {sessions} = await auth.api.listUserSessions({
    body: {
      userId,
    },
    headers: await headers(),
  })

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 flex-1">
      <div className="max-w-xl w-full">
        <UserSessions
          sessions={sessions}
          sessionId={sessionToken ?? ''}
          userId={userId}
        />
      </div>
    </div>
  )
}