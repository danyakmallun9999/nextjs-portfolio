import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/blog';

export async function GET() {
  try {
    console.log('Fetching categories...');
    const categories = getAllCategories();
    console.log(`Found ${categories.length} categories:`, categories);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch categories', details: errorMessage }, { status: 500 });
  }
}
