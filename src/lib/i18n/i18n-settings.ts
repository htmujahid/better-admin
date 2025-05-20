/**
 * The default language of the application.
 * This is used as a fallback language when the selected language is not supported.
 *
 */
const defaultLanguage = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en';

/**
 * The list of supported languages.
 * By default, only the default language is supported.
 * Add more languages here if needed.
 */
export const languages: string[] = [defaultLanguage];

/**
 * The name of the cookie that stores the selected language.
 */
export const I18N_COOKIE_NAME = 'lang';

/**
 * The default array of Internationalization (i18n) namespaces.
 * These namespaces are commonly used in the application for translation purposes.
 *
 * Add your own namespaces here
 **/
export const defaultI18nNamespaces = [
  'common',
  'auth',
  'account',
  'teams',
  'billing',
  'marketing',
];

/**
 * Get the i18n settings for the given language and namespaces.
 * If the language is not supported, it will fall back to the default language.
 * @param language
 * @param ns
 */
export function getI18nSettings(
  language: string | undefined,
  ns: string | string[] = defaultI18nNamespaces,
) {
  let lng = language ?? defaultLanguage;

  if (!languages.includes(lng)) {
    console.warn(
      `Language "${lng}" is not supported. Falling back to "${defaultLanguage}"`,
    );

    lng = defaultLanguage;
  }

  return {
    supportedLngs: languages,
    fallbackLng: languages[0],
    detection: undefined,
    lng,
    load: 'languageOnly' as const,
    preload: false as const,
    lowerCaseLng: true as const,
    fallbackNS: ns,
    missingInterpolationHandler: (
      text: string,
      value: unknown,
      options: unknown,
    ) => {
      console.debug(
        `Missing interpolation value for key: ${text}`,
        value,
        options,
      );
    },
    ns,
    react: {
      useSuspense: true,
    },
  };
}
