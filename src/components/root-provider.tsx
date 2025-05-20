'use client';

import { useMemo } from 'react';
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from 'next-themes';

import { I18nProvider } from '@/components/i18n-provider';

import { AuthProvider, type AuthSession } from '@/components/auth-provider';
import appConfig from '@/config/app.config';
import { i18nResolver } from '@/lib/i18n/i18n-resolver';
import { getI18nSettings } from '@/lib/i18n/i18n-settings';

import { ReactQueryProvider } from './react-query-provider';

export function RootProviders({
  lang,
  theme = appConfig.theme,
  children,
  auth,
}: React.PropsWithChildren<{
  lang: string;
  theme?: string;
  auth: AuthSession | null
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