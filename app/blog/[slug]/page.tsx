import { getAllBlogPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Metadata } from 'next';

// Generate metadata for blog posts
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { getBlogPostBySlug } = await import('@/lib/blog');
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    title: `${post.title} - Dany Akmallun Ni'am`,
    description: post.description,
    keywords: post.tags?.join(', ') || '',
    authors: [{ name: 'Dany Akmallun Ni\'am' }],
    creator: 'Dany Akmallun Ni\'am',
    publisher: 'Dany Akmallun Ni\'am',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://danyakmallun.com'),
    alternates: {
      canonical: `https://danyakmallun.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://danyakmallun.com/blog/${post.slug}`,
      siteName: 'Dany Akmallun Ni\'am',
      locale: 'id_ID',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Dany Akmallun Ni\'am'],
      tags: post.tags || [],
      images: post.coverImage ? [
        {
          url: `https://danyakmallun.com${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: 'https://danyakmallun.com/opengraph.jpg',
          width: 1366,
          height: 768,
          alt: 'Dany Akmallun Ni\'am - Profile Picture',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? `https://danyakmallun.com${post.coverImage}` : 'https://danyakmallun.com/opengraph.jpg',
      creator: '@danyakmallun',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Custom components for ReactMarkdown
const components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={tomorrow}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200" {...props}>
        {children}
      </code>
    );
  },
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 mt-8">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4 mt-6">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 mt-5">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-zinc-700 dark:text-zinc-300 mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-zinc-700 dark:text-zinc-300">
      {children}
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-zinc-300 dark:border-zinc-600">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-zinc-100 dark:bg-zinc-800">
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="bg-white dark:bg-zinc-900">
      {children}
    </tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b border-zinc-300 dark:border-zinc-600">
      {children}
    </tr>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
      {children}
    </td>
  ),
  a: ({ href, children }: any) => (
    <a 
      href={href} 
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { getBlogPostBySlug } = await import('@/lib/blog');
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        {post.coverImage && (
          <div className="mb-6 w-full overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{post.description}</p>
        <time className="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString('id-ID')}
        </time>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            ...components,
            h1: () => null, // Hapus h1 dari konten karena sudah ada di header
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
