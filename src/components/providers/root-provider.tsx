'use client';

import { useMemo } from 'react';

import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { AuthProvider } from '@/components/providers/auth-provider';
import { I18nProvider } from '@/components/providers/i18n-provider';
import appConfig from '@/config/app.config';
import { authClient } from '@/lib/auth/auth-client';
import { i18nResolver } from '@/lib/i18n/i18n-resolver';
import { getI18nSettings } from '@/lib/i18n/i18n-settings';

import { ReactQueryProvider } from './react-query-provider';

type AuthSession = typeof authClient.$Infer.Session;

export function RootProviders({
  lang,
  theme = appConfig.theme,
  children,
  auth,
}: React.PropsWithChildren<{
  lang: string;
  theme?: string;
  auth: AuthSession | null;
}>) {
  const i18nSettings = useMemo(() => getI18nSettings(lang), [lang]);

  return (
    <ReactQueryProvider>
      <I18nProvider settings={i18nSettings} resolver={i18nResolver}>
        <AuthProvider auth={auth}>
          <NuqsAdapter>
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
              defaultTheme={theme}
              enableColorScheme={false}
            >
              {children}
            </ThemeProvider>
          </NuqsAdapter>
        </AuthProvider>
      </I18nProvider>
    </ReactQueryProvider>
  );
}
