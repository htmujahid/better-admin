import { createContext, useContext, useCallback, useMemo } from 'react';
import type { session, user } from '@/db/schema';
import { allRoles } from '@/lib/roles'

export type User = typeof user.$inferInsert

export type Session = typeof session.$inferInsert

export type AuthSession = {
  user: User | null
  session: Session | null
}

const AuthContext = createContext<{
  auth: AuthSession | null
}>({
  auth: null
})

export function AuthProvider(props: React.PropsWithChildren<{
  auth: AuthSession | null
}>) {

  return (
    <AuthContext.Provider value={{ auth: props.auth }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  
  return context.auth;
}

type AuthorizeFunction = (typeof allRoles)[keyof typeof allRoles]['authorize']

export function useAccessControl() {
  const auth = useAuth()

  const roles = useMemo(() => {
    return auth?.user?.role?.split(',') as Array<keyof typeof allRoles>
  }, [auth?.user?.role])

  const hasPermission = useCallback(
    (...args: Parameters<AuthorizeFunction>) => {
      let check = false
      roles.forEach((role) => {
        if (allRoles[role].authorize(...args).success) {
          check = true
        }
      })
      return check
    },
    [roles],
  )

  const hasRole = useCallback(
    (role: keyof typeof allRoles) => {
      return roles.includes(role)
    },
    [roles],
  )

  const getRolePermissions = useCallback((role: keyof typeof allRoles) => {
    return allRoles[role].statements
  }, [])

  return {
    roles,
    hasPermission,
    hasRole,
    getRolePermissions,
  }
}