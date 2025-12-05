import { collection, config, fields } from '@keystatic/core';
import type { Node } from '@markdoc/markdoc';

export type PostEntryProps = {
  title: string;
  label?: string | null;
  description: string;
  categories: readonly string[];
  tags: readonly string[];
  image: string | null;
  publishedAt: string | null;
  status: 'draft' | 'published';
  parent?: string | null;
  order?: number | null;
  content: () => Promise<{ node: Node }>;
};

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blogs: collection({
      label: 'Blogs',
      slugField: 'title',
      path: 'src/content/blogs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        label: fields.text({
          label: 'Label',
          description: 'Optional short label for the post',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        categories: fields.array(fields.text({ label: 'Category' }), {
          label: 'Categories',
          itemLabel: (props) => props.value,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        image: fields.text({
          label: 'Cover Image',
          description:
            'Path to the cover image (e.g., /images/posts/image.webp)',
        }),
        publishedAt: fields.date({
          label: 'Published At',
          defaultValue: { kind: 'today' },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blogs',
              publicPath: '/images/blogs',
            },
          },
        }),
      },
    }),
  },
});
