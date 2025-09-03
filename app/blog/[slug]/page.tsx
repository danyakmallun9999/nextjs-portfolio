import { getAllBlogPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Metadata } from 'next'
import CodeHighlighter from '@/app/components/SyntaxHighlighter'

// Generate metadata for blog posts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const { getBlogPostBySlug } = await import('@/lib/blog')
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return {
    title: `${post.title} - Dany Akmallun Ni'am`,
    description: post.description,
    keywords: post.tags?.join(', ') || '',
    authors: [{ name: "Dany Akmallun Ni'am" }],
    creator: "Dany Akmallun Ni'am",
    publisher: "Dany Akmallun Ni'am",
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
      siteName: "Dany Akmallun Ni'am",
      locale: 'id_ID',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ["Dany Akmallun Ni'am"],
      tags: post.tags || [],
      images: post.coverImage
        ? [
            {
              url: `https://danyakmallun.com${post.coverImage}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: 'https://danyakmallun.com/opengraph.jpg',
              width: 1366,
              height: 768,
              alt: "Dany Akmallun Ni'am - Profile Picture",
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage
        ? `https://danyakmallun.com${post.coverImage}`
        : 'https://danyakmallun.com/opengraph.jpg',
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
  }
}

// Custom components for ReactMarkdown
const components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <CodeHighlighter
        language={match[1]}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </CodeHighlighter>
    ) : (
      <code
        className="rounded bg-zinc-200 px-1 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
        {...props}
      >
        {children}
      </code>
    )
  },
  h1: ({ children }: any) => (
    <h1 className="mt-8 mb-6 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="mt-6 mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="mt-5 mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="mb-4 list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-4 list-inside list-decimal space-y-1 text-zinc-700 dark:text-zinc-300">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-zinc-700 dark:text-zinc-300">{children}</li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-4 border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 text-zinc-700 italic dark:bg-blue-900/20 dark:text-zinc-300">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border border-zinc-300 dark:border-zinc-600">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-zinc-100 dark:bg-zinc-800">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="bg-white dark:bg-zinc-900">{children}</tbody>
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
    <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{children}</td>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-blue-600 hover:underline dark:text-blue-400"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const { getBlogPostBySlug } = await import('@/lib/blog')
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8">
        {post.coverImage && (
          <div className="mb-6 w-full overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto max-h-96 w-full object-contain"
            />
          </div>
        )}
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <p className="mb-4 text-xl text-gray-600">{post.description}</p>
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
  )
}
