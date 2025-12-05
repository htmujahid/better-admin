import { Footer } from '@/components/marketing/footer';
import { Header } from '@/components/marketing/header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
