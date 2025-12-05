'use client';

import { useAccessControl } from '@/components/providers/auth-provider';
import type { allRoles } from '@/lib/auth/roles';

export function HasRole({
  children,
  role,
}: {
  children: React.ReactNode;
  role: keyof typeof allRoles;
}) {
  const { hasRole } = useAccessControl();

  if (hasRole(role)) {
    return <>{children}</>;
  }

  return null;
}
