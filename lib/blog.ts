import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
}

export function getAllBlogPosts(): BlogPost[] {
  // Pastikan direktori ada
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        content: matterResult.content,
        ...matterResult.data,
      } as BlogPost;
    });

  // Sort posts by date: newest first (descending order)
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA; // Descending order: newest first
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      content: matterResult.content,
      ...matterResult.data,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = posts
    .map(post => post.category)
    .filter((category): category is string => !!category);
  
  // Remove duplicates and sort
  return [...new Set(categories)].sort();
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.tags?.includes(tag));
}
