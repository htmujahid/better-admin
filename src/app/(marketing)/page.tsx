import { CTA } from '@/components/marketing/cta';
import { Features } from '@/components/marketing/features';
import { Hero } from '@/components/marketing/hero';
import { QuickStart } from '@/components/marketing/quick-start';
import { TechStack } from '@/components/marketing/tech-stack';
import { WhatsIncluded } from '@/components/marketing/whats-included';

export default function MarketingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <WhatsIncluded />
      <TechStack />
      <QuickStart />
      <CTA />
    </div>
  );
}
