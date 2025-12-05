import { Check } from 'lucide-react';

const categories = [
  {
    title: 'Authentication',
    items: [
      'Email/password sign up & sign in',
      'OAuth providers (GitHub, Google)',
      'Email verification flow',
      'Password reset with email',
      'Two-factor authentication (TOTP)',
      'Session management',
      'Multi-device support',
    ],
  },
  {
    title: 'Admin Panel',
    items: [
      'User listing with filters',
      'User creation & editing',
      'Role assignment',
      'Ban/unban users',
      'Session tracking',
      'User impersonation',
      'Bulk actions',
    ],
  },
  {
    title: 'User Dashboard',
    items: [
      'Profile management',
      'Email change with verification',
      'Password update',
      'Profile image upload',
      'Active sessions view',
      '2FA enable/disable',
      'Account deletion',
    ],
  },
  {
    title: 'UI Components',
    items: [
      '50+ Shadcn components',
      'Advanced data tables',
      'Form components with validation',
      'Modal & drawer dialogs',
      'Command palette',
      'Toast notifications',
      'Dark mode support',
    ],
  },
];

export function WhatsIncluded() {
  return (
    <section className="w-full border-t py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What&apos;s Included
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            A complete list of features ready to use. No additional setup
            required.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-4 font-semibold">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-start text-sm"
                  >
                    <Check className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
