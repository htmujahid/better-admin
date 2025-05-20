import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RootProviders } from "@/components/root-provider";
import { createI18nServerInstance } from "@/lib/i18n/i18n-server";
import { getRootTheme } from "@/lib/root-theme";
import { getSession } from "./home/(user)/_lib/actions/get-session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Admin",
  description: "Better Admin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getSession();
  const { language } = await createI18nServerInstance();
  const theme = await getRootTheme();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProviders lang={language} theme={theme} auth={auth}>
          {children}
        </RootProviders>
        <Toaster />
      </body>
    </html>
  );
}
