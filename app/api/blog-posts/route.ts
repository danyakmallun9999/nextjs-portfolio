import { NextResponse } from 'next/server';
import { getAllBlogPosts, getAllCategories, getBlogPostsByCategory } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    console.log('Fetching blog posts...', category ? `with category: ${category}` : 'all posts');
    
    let posts;
    if (category) {
      posts = getBlogPostsByCategory(category);
    } else {
      posts = getAllBlogPosts();
    }
    
    console.log(`Found ${posts.length} blog posts`);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch blog posts', details: errorMessage }, { status: 500 });
  }
}
