import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface BlogPost {
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedAt: string;
  coverImage?: {
    url: string;
    alt: string;
  };
  tags?: string[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: ['-sys.createdAt'],
  });

  return response.items.map((item: any) => ({
    title: item.fields.title as string,
    description: item.fields.description as string,
    slug: item.fields.slug as string,
    content: item.fields.content as string,
    publishedAt: item.sys.createdAt as string,
    coverImage: item.fields.coverImage ? {
      url: (item.fields.coverImage as any).fields.file.url as string,
      alt: (item.fields.coverImage as any).fields.description as string,
    } : undefined,
    tags: (item.fields.tags || []) as string[],
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (response.items.length === 0) {
    return null;
  }

  const item = response.items[0];
  return {
    title: item.fields.title as string,
    description: item.fields.description as string,
    slug: item.fields.slug as string,
    content: item.fields.content as string,
    publishedAt: item.sys.createdAt as string,
    coverImage: item.fields.coverImage ? {
      url: (item.fields.coverImage as any).fields.file.url as string,
      alt: (item.fields.coverImage as any).fields.description as string,
    } : undefined,
    tags: (item.fields.tags || []) as string[],
  };
}
