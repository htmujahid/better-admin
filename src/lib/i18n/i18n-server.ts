import { cache } from 'react';

import { cookies, headers } from 'next/headers';

import { type InitOptions, createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { i18nResolver } from './i18n-resolver';
import { I18N_COOKIE_NAME, getI18nSettings, languages } from './i18n-settings';

/**
 * Initialize the i18n instance on the server.
 * This is useful for RSC and SSR.
 * @param settings - the i18n settings
 * @param resolver - a function that resolves the i18n resources
 */
export async function initializeServerI18n(
  settings: InitOptions,
  resolver: (language: string, namespace: string) => Promise<object>,
) {
  const i18nInstance = createInstance();
  const loadedNamespaces = new Set<string>();

  await new Promise((resolve) => {
    void i18nInstance
      .use(
        resourcesToBackend(async (language, namespace, callback) => {
          try {
            const data = await resolver(language, namespace);
            loadedNamespaces.add(namespace);

            return callback(null, data);
          } catch (error) {
            console.log(
              `Error loading i18n file: locales/${language}/${namespace}.json`,
              error,
            );

            return callback(null, {});
          }
        }),
      )
      .use({
        type: '3rdParty',
        init: async (i18next: typeof i18nInstance) => {
          let iterations = 0;
          const maxIterations = 100;

          // do not bind this to the i18next instance until it's initialized
          while (i18next.isInitializing) {
            iterations++;

            if (iterations > maxIterations) {
              console.error(
                `i18next is not initialized after ${maxIterations} iterations`,
              );

              break;
            }

            await new Promise((resolve) => setTimeout(resolve, 1));
          }

          initReactI18next.init(i18next);
          resolve(i18next);
        },
      })
      .init(settings);
  });

  const namespaces = settings.ns as string[];

  // If all namespaces are already loaded, return the i18n instance
  if (loadedNamespaces.size === namespaces.length) {
    return i18nInstance;
  }

  // Otherwise, wait for all namespaces to be loaded

  const maxWaitTime = 0.1; // 100 milliseconds
  const checkIntervalMs = 5; // 5 milliseconds

  async function waitForNamespaces() {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      const allNamespacesLoaded = namespaces.every((ns) =>
        loadedNamespaces.has(ns),
      );

      if (allNamespacesLoaded) {
        return true;
      }

      await new Promise((resolve) => setTimeout(resolve, checkIntervalMs));
    }

    return false;
  }

  const success = await waitForNamespaces();

  if (!success) {
    console.warn(
      `Not all namespaces were loaded after ${maxWaitTime}ms. Initialization may be incomplete.`,
    );
  }

  return i18nInstance;
}

/**
 * Parse the accept-language header value and return the languages that are included in the accepted languages.
 * @param languageHeaderValue
 * @param acceptedLanguages
 */
export function parseAcceptLanguageHeader(
  languageHeaderValue: string | null | undefined,
  acceptedLanguages: string[],
): string[] {
  // Return an empty array if the header value is not provided
  if (!languageHeaderValue) return [];

  const ignoreWildcard = true;

  // Split the header value by comma and map each language to its quality value
  return languageHeaderValue
    .split(',')
    .map((lang): [number, string] => {
      const [locale, q = 'q=1'] = lang.split(';');

      if (!locale) return [0, ''];

      const trimmedLocale = locale.trim();
      const numQ = Number(q.replace(/q ?=/, ''));

      return [isNaN(numQ) ? 0 : numQ, trimmedLocale];
    })
    .sort(([q1], [q2]) => q2 - q1) // Sort by quality value in descending order
    .flatMap(([, locale]) => {
      // Ignore wildcard '*' if 'ignoreWildcard' is true
      if (locale === '*' && ignoreWildcard) return [];

      const languageSegment = locale.split('-')[0];

      if (!languageSegment) return [];

      // Return the locale if it's included in the accepted languages
      try {
        return acceptedLanguages.includes(languageSegment)
          ? [languageSegment]
          : [];
      } catch {
        return [];
      }
    });
}

/**
 * @name createI18nServerInstance
 * @description Creates an instance of the i18n server.
 * It uses the language from the cookie if it exists, otherwise it uses the language from the accept-language header.
 * If neither is available, it will default to the provided environment variable.
 *
 * Initialize the i18n instance for every RSC server request (eg. each page/layout)
 */
async function _createInstance() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(I18N_COOKIE_NAME)?.value;

  let selectedLanguage: string | undefined = undefined;

  // if the cookie is set, use the language from the cookie
  if (cookie) {
    selectedLanguage = getLanguageOrFallback(cookie);
  }

  // if not, check if the language priority is set to user and
  // use the user's preferred language
  if (!selectedLanguage) {
    const userPreferredLanguage = await getPreferredLanguageFromBrowser();

    selectedLanguage = getLanguageOrFallback(userPreferredLanguage);
  }

  const settings = getI18nSettings(selectedLanguage);

  return initializeServerI18n(settings, i18nResolver);
}

export const createI18nServerInstance = cache(_createInstance);

async function getPreferredLanguageFromBrowser() {
  const headersStore = await headers();
  const acceptLanguage = headersStore.get('accept-language');

  if (!acceptLanguage) {
    return;
  }

  return parseAcceptLanguageHeader(acceptLanguage, languages)[0];
}

function getLanguageOrFallback(language: string | undefined) {
  let selectedLanguage = language;

  if (!languages.includes(language ?? '')) {
    console.warn(
      `Language "${language}" is not supported. Falling back to "${languages[0]}"`,
    );

    selectedLanguage = languages[0];
  }

  return selectedLanguage;
}
