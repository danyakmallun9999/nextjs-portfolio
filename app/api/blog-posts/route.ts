import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

export async function GET() {
  try {
    console.log('Fetching blog posts...');
    const posts = getAllBlogPosts();
    console.log(`Found ${posts.length} blog posts`);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch blog posts', details: errorMessage }, { status: 500 });
  }
}
