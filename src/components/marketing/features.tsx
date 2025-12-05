import {
  Database,
  KeyRound,
  LayoutDashboard,
  Lock,
  Shield,
  Table2,
  Users,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: KeyRound,
    title: 'Complete Authentication',
    description:
      'Email/password, OAuth (GitHub, Google), email verification, password reset, and session management.',
  },
  {
    icon: Lock,
    title: 'Two-Factor Authentication',
    description:
      'TOTP-based 2FA with QR code setup, backup codes, and secure verification flow.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access Control',
    description:
      'Granular permissions system with admin and user roles. Control access at page and action level.',
  },
  {
    icon: Users,
    title: 'User Management',
    description:
      'Admin dashboard for users with filtering, sorting, ban management, and impersonation.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboard',
    description:
      'Pre-built admin panel with user listing, session tracking, role assignment, and bulk actions.',
  },
  {
    icon: Table2,
    title: 'Advanced Data Tables',
    description:
      'Sortable, filterable tables with faceted filters, date ranges, pagination, and row selection.',
  },
  {
    icon: Database,
    title: 'Database Ready',
    description:
      'Drizzle ORM with PostgreSQL, type-safe queries, migrations, and pre-built schemas included.',
  },
  {
    icon: Zap,
    title: 'Type-Safe APIs',
    description:
      'End-to-end typesafe RPC with oRPC. Auto-generated types from Zod schemas.',
  },
];

export function Features() {
  return (
    <section className="w-full border-t py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Ship Fast
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Production-ready features that would take weeks to build from
            scratch. All integrated and working out of the box.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="space-y-3">
              <feature.icon className="text-foreground h-6 w-6" />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
