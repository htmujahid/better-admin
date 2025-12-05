import { withAuthenticate } from '@/components/acccess/with-authenticate';
import { AppHeader } from '@/components/app-header';
import { Footer } from '@/components/marketing/footer';

async function NavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
export default withAuthenticate(NavbarLayout);
