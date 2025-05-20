import type { allRoles } from '@/lib/roles'
import { useAccessControl } from '@/components/auth-provider'

export function HasRole({
  children,
  role,
}: {
  children: React.ReactNode
  role: keyof typeof allRoles
}) {
  const { hasRole } = useAccessControl()

  if (hasRole(role)) {
    return <>{children}</>
  }

  return null
}