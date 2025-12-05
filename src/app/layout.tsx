import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { getSession } from '@/actions/user/get-session';
import { RootProviders } from '@/components/providers/root-provider';
import { Toaster } from '@/components/ui/sonner';
import { createI18nServerInstance } from '@/lib/i18n/i18n-server';
import '@/orpc/server';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Bard',
  description: 'Next Bard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [_, auth] = await getSession();
  const { language } = await createI18nServerInstance();
  const theme = await getRootTheme();

  return (
    <html lang={language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProviders lang={language} theme={theme} auth={auth ?? null}>
          {children}
        </RootProviders>
        <Toaster />
      </body>
    </html>
  );
}

type Theme = 'light' | 'dark' | 'system';

/**
 * @name getRootTheme
 * @description Get the root theme from the cookies or default theme.
 * @returns The root theme.
 */
export async function getRootTheme() {
  const cookiesStore = await cookies();

  const themeCookie = cookiesStore.get('theme')?.value as Theme;

  return themeCookie ?? process.env.NEXT_PUBLIC_DEFAULT_THEME_MODE ?? 'light';
}
