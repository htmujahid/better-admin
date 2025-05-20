import { cookies } from 'next/headers';

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
