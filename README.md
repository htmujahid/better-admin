# Next Bard

A production-ready, full-stack Next.js 16 boilerplate with authentication, admin panel, user dashboard, CMS, and advanced data tables.

## Features

### Authentication (Better Auth)

- **Email & Password** - Sign up, sign in, email verification, password reset
- **OAuth Providers** - GitHub and Google social login
- **Two-Factor Authentication** - TOTP with QR codes, OTP via email, backup codes
- **Session Management** - Multiple sessions, IP/user agent tracking, session termination
- **Role-Based Access Control** - Admin and user roles with permission-based access

### Admin Dashboard

- User management (create, update, delete, ban/unban)
- User session monitoring
- Role assignment
- User impersonation for debugging
- Statistics and analytics overview

### User Dashboard

- Profile management with image upload
- Email change with verification
- Password management
- Two-factor authentication setup
- Session management
- Preferences configuration

### Tasks Management

- Create, read, update, delete tasks
- Batch operations
- Status tracking (todo, in-progress, done, canceled)
- Priority levels (low, medium, high)
- Labels (bug, feature, enhancement, documentation)

### Advanced Data Tables

- **Multiple Filter Modes**:
  - Advanced filters (Airtable-like)
  - Command filters (Linear-like)
  - Standard filters
- Multi-column sorting
- Server-side pagination
- Column visibility toggle
- URL state persistence
- Bulk actions
- Date, range, and slider filters

### CMS (Keystatic)

- Headless CMS with local file storage
- Markdown/Markdoc content editor
- Blog management with categories and tags
- Draft/published workflow
- Cover image support

### Marketing Pages

- Landing page with hero, features, tech stack sections
- Blog listing and detail pages
- About, Pricing, Privacy, Terms pages

### API Layer (oRPC)

- Type-safe RPC with OpenAPI support
- Interactive API documentation at `/api/docs`
- OpenAPI spec at `/api/spec.json`
- Zod validation on all endpoints

### Payment Integration

This boilerplate intentionally ships without a built-in payment provider to maximize flexibility and scalability. With Better Auth's plugin system, you can add any payment integration in less than 10 lines of code:

- [Stripe](https://www.better-auth.com/docs/plugins/stripe#user) - Industry-standard payment processing
- [Polar](https://www.better-auth.com/docs/plugins/polar) - Open source friendly monetization
- [Autumn](https://www.better-auth.com/docs/plugins/autumn) - Usage-based billing
- [DodoPayments](https://www.better-auth.com/docs/plugins/dodopayments) - Global payment solution
- [Creem](https://www.better-auth.com/docs/plugins/creem) - Creator economy payments

### Additional Features

- **Internationalization** - i18next with language detection
- **Email System** - Nodemailer with SMTP support
- **File Upload** - AWS S3 / S3-compatible storage (MinIO)
- **Theme Support** - Light, dark, and system themes
- **Form Handling** - React Hook Form with Zod validation
- **Toast Notifications** - Sonner integration
- **Drag and Drop** - dnd-kit for sortable interfaces

## Tech Stack

| Category         | Technology                         |
| ---------------- | ---------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack) |
| Language         | TypeScript                         |
| Styling          | Tailwind CSS v4                    |
| UI Components    | Shadcn/ui (47+ components)         |
| Database         | PostgreSQL with Drizzle ORM        |
| Authentication   | Better Auth                        |
| API              | oRPC with OpenAPI                  |
| State Management | TanStack React Query               |
| Forms            | React Hook Form + Zod              |
| Tables           | TanStack React Table               |
| CMS              | Keystatic                          |
| Email            | Nodemailer                         |
| File Storage     | AWS S3 / MinIO                     |
| Animations       | Motion                             |
| i18n             | i18next                            |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- S3-compatible storage (optional)
- SMTP server for emails (optional)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd next-bard
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment file and configure:

```bash
cp example.env .env
```

4. Start the database (using Docker):

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
npm run db:migrate
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Scripts

| Script                | Description                             |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Start development server with Turbopack |
| `npm run build`       | Build for production                    |
| `npm run start`       | Start production server                 |
| `npm run lint`        | Run ESLint                              |
| `npm run typecheck`   | Run TypeScript type checking            |
| `npm run format`      | Check code formatting with Prettier     |
| `npm run format:fix`  | Fix code formatting                     |
| `npm run db:generate` | Generate Drizzle migrations             |
| `npm run db:migrate`  | Run database migrations                 |
| `npm run db:studio`   | Open Drizzle Studio                     |
| `npm run ba:generate` | Generate Better Auth schema             |

## Project Structure

```
src/
├── actions/           # Server actions
├── app/
│   ├── (marketing)/   # Public pages (landing, blog, etc.)
│   ├── admin/         # Admin dashboard
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   └── home/          # User dashboard
├── components/
│   ├── admin/         # Admin-specific components
│   ├── auth/          # Authentication forms
│   ├── data-table/    # Advanced table components
│   ├── marketing/     # Marketing page components
│   ├── providers/     # Context providers
│   ├── sidebar/       # Sidebar navigation
│   ├── tasks/         # Task management components
│   ├── ui/            # Shadcn/ui components
│   └── user/          # User dashboard components
├── config/            # App configuration
├── content/           # Keystatic content (blogs)
├── db/                # Database schema and client
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
│   ├── auth/          # Authentication utilities
│   ├── data-table/    # Table utilities
│   ├── i18n/          # Internationalization
│   ├── keystatic/     # CMS utilities
│   └── query/         # React Query utilities
├── orpc/              # oRPC API definitions
├── seeders/           # Database seeders
├── types/             # TypeScript types
└── validators/        # Zod validation schemas
```

## Docker Services

The `docker-compose.yml` includes:

| Service    | Port       | Description                   |
| ---------- | ---------- | ----------------------------- |
| PostgreSQL | 5432       | Database server               |
| MinIO      | 9000, 9001 | S3-compatible storage         |
| Mailpit    | 1025, 8025 | Email testing (SMTP + Web UI) |

## Environment Variables

See `example.env` for all available environment variables:

- **Database**: PostgreSQL connection string
- **Auth**: Better Auth secret, OAuth credentials
- **Email**: SMTP configuration
- **S3**: AWS/MinIO credentials and endpoints
- **App**: Base URL, app name

## License

MIT
