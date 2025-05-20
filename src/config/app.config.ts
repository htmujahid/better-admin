import { z } from 'zod';

const production = process.env.NODE_ENV === 'production';

const AppConfigSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  url: z.string().url(),
  locale: z.string().default('en'),
  theme: z.enum(['light', 'dark', 'system']),
  production: z.boolean(),
});

const appConfig = AppConfigSchema.parse({
  name: process.env.NEXT_PUBLIC_APP_NAME,
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  url: process.env.NEXT_PUBLIC_BASE_URL,
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  theme: process.env.NEXT_PUBLIC_DEFAULT_THEME,
  production,
});

export default appConfig;
