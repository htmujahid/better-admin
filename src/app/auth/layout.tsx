import { AppLogo } from '@/components/app-logo';

function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <AppLogo />
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;
