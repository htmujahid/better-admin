import { createReader } from '@keystatic/core/reader';

import keystaticConfig, { type PostEntryProps } from '@/../keystatic.config';

import { renderMarkdoc } from './markdoc';

export const reader = createReader(process.cwd(), keystaticConfig);

export type CollectionName = keyof (typeof reader)['collections'];

export interface ContentItem {
  id: string;
  title: string;
  label?: string;
  url: string;
  slug: string;
  description: string;
  publishedAt: string;
  content: React.ReactNode;
  image?: string;
  status: 'draft' | 'published';
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
}

export interface GetContentItemsOptions {
  collection: CollectionName;
  status?: 'draft' | 'published';
  limit?: number;
  offset?: number;
  sortBy?: 'publishedAt' | 'title';
  sortDirection?: 'asc' | 'desc';
  categories?: string[];
  tags?: string[];
}

export async function getContentItems(
  options: GetContentItemsOptions,
): Promise<{ total: number; items: ContentItem[] }> {
  const collectionReader = reader.collections[options.collection];

  if (!collectionReader) {
    throw new Error(`Collection "${options.collection}" not found`);
  }

  const docs = await collectionReader.all();
  const status = options.status ?? 'published';
  const startOffset = options.offset ?? 0;
  const endOffset = startOffset + (options.limit ?? 100);
  const sortDirection = options.sortDirection ?? 'desc';

  const filtered = docs
    .filter((item) => {
      const entry = item.entry as unknown as PostEntryProps;

      if (entry.status !== status) {
        return false;
      }

      if (options.categories?.length) {
        const hasCategory = options.categories.some((cat) =>
          entry.categories?.includes(cat),
        );
        if (!hasCategory) return false;
      }

      if (options.tags?.length) {
        const hasTag = options.tags.some((tag) => entry.tags?.includes(tag));
        if (!hasTag) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const entryA = a.entry as unknown as PostEntryProps;
      const entryB = b.entry as unknown as PostEntryProps;

      const dateA = entryA.publishedAt
        ? new Date(entryA.publishedAt).getTime()
        : 0;
      const dateB = entryB.publishedAt
        ? new Date(entryB.publishedAt).getTime()
        : 0;

      return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const items = await Promise.all(
    filtered.slice(startOffset, endOffset).map((item) =>
      mapContentItem({
        entry: item.entry as unknown as PostEntryProps,
        slug: item.slug,
        collection: options.collection,
      }),
    ),
  );

  return {
    total: filtered.length,
    items,
  };
}

export async function getContentItemBySlug(
  slug: string,
  options: { collection: CollectionName; status?: 'draft' | 'published' },
): Promise<ContentItem | undefined> {
  const collectionReader = reader.collections[options.collection];

  if (!collectionReader) {
    throw new Error(`Collection "${options.collection}" not found`);
  }

  const doc = await collectionReader.read(slug);
  const status = options.status ?? 'published';

  if (!doc) {
    return undefined;
  }

  const entry = doc as unknown as PostEntryProps;

  if (entry.status !== status) {
    return undefined;
  }

  return mapContentItem({
    entry,
    slug,
    collection: options.collection,
  });
}

async function mapContentItem(item: {
  entry: PostEntryProps;
  slug: string;
  collection: CollectionName;
}): Promise<ContentItem> {
  const publishedAt = item.entry.publishedAt
    ? new Date(item.entry.publishedAt)
    : new Date();

  const content = await item.entry.content();
  const html = await renderMarkdoc(content.node);

  return {
    id: item.slug,
    title: item.entry.title,
    label: item.entry.label ?? undefined,
    url: `/${item.collection}/${item.slug}`,
    slug: item.slug,
    description: item.entry.description,
    publishedAt: publishedAt.toISOString(),
    content: html,
    image: item.entry.image ?? undefined,
    status: item.entry.status,
    categories: (item.entry.categories ?? []).map((cat) => ({
      id: cat,
      name: cat,
      slug: cat,
    })),
    tags: (item.entry.tags ?? []).map((tag) => ({
      id: tag,
      name: tag,
      slug: tag,
    })),
  };
}
