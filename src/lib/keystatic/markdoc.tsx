import React from 'react';

import type { Node } from '@markdoc/markdoc';

const config = {
  nodes: {
    heading: {
      render: 'Heading',
      attributes: {
        level: { type: Number, required: true },
      },
    },
    paragraph: {
      render: 'Paragraph',
    },
    fence: {
      render: 'CodeBlock',
      attributes: {
        language: { type: String },
        content: { type: String },
      },
    },
    code: {
      render: 'InlineCode',
    },
    link: {
      render: 'Link',
      attributes: {
        href: { type: String, required: true },
        title: { type: String },
      },
    },
    image: {
      render: 'Image',
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        title: { type: String },
      },
    },
    blockquote: {
      render: 'Blockquote',
    },
    list: {
      render: 'List',
      attributes: {
        ordered: { type: Boolean, default: false },
      },
    },
    item: {
      render: 'ListItem',
    },
    hr: {
      render: 'Divider',
    },
    strong: {
      render: 'Strong',
    },
    em: {
      render: 'Emphasis',
    },
    s: {
      render: 'Strikethrough',
    },
  },
};

function Heading({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  const styles: Record<number, string> = {
    1: 'text-4xl font-bold mt-8 mb-4',
    2: 'text-3xl font-semibold mt-6 mb-3',
    3: 'text-2xl font-semibold mt-5 mb-2',
    4: 'text-xl font-medium mt-4 mb-2',
    5: 'text-lg font-medium mt-3 mb-1',
    6: 'text-base font-medium mt-2 mb-1',
  };

  switch (level) {
    case 1:
      return <h1 className={styles[1]}>{children}</h1>;
    case 2:
      return <h2 className={styles[2]}>{children}</h2>;
    case 3:
      return <h3 className={styles[3]}>{children}</h3>;
    case 4:
      return <h4 className={styles[4]}>{children}</h4>;
    case 5:
      return <h5 className={styles[5]}>{children}</h5>;
    case 6:
      return <h6 className={styles[6]}>{children}</h6>;
    default:
      return <h2 className={styles[2]}>{children}</h2>;
  }
}

const components = {
  Heading,
  Paragraph: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-7">{children}</p>
  ),
  CodeBlock: ({
    language,
    children,
  }: {
    language?: string;
    children: React.ReactNode;
  }) => (
    <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
      <code className={`text-sm ${language ? `language-${language}` : ''}`}>
        {children}
      </code>
    </pre>
  ),
  InlineCode: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted rounded px-1.5 py-0.5 text-sm">{children}</code>
  ),
  Link: ({
    href,
    children,
  }: {
    href: string;
    title?: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:no-underline"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  Image: ({
    src,
    alt,
    title,
  }: {
    src: string;
    alt?: string;
    title?: string;
  }) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt || ''}
        title={title}
        className="h-auto w-full rounded-lg"
        loading="lazy"
      />
      {alt && (
        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  Blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-primary/50 text-muted-foreground my-6 border-l-4 pl-4 italic">
      {children}
    </blockquote>
  ),
  List: ({
    ordered,
    children,
  }: {
    ordered?: boolean;
    children: React.ReactNode;
  }) =>
    ordered ? (
      <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
    ) : (
      <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
  ListItem: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  Divider: () => <hr className="my-8" />,
  Strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  Emphasis: ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  Strikethrough: ({ children }: { children: React.ReactNode }) => (
    <del className="line-through">{children}</del>
  ),
};

export async function renderMarkdoc(node: Node) {
  const { transform, renderers } = await import('@markdoc/markdoc');
  const transformed = transform(node, config);
  return renderers.react(transformed, React, { components });
}
