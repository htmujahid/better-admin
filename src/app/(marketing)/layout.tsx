import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
