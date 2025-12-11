import { getAllBlogPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Metadata } from 'next'
import CodeHighlighter from '@/app/components/SyntaxHighlighter'
import ShareButtons from '@/app/components/ShareButtons'
import Image from 'next/image'
import { generateArticleStructuredData, generateBreadcrumbStructuredData, BreadcrumbItem } from '@/lib/structured-data'

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
        className="rounded bg-white/10 px-1 py-0.5 font-mono text-sm text-white"
        {...props}
      >
        {children}
      </code>
    )
  },
  h1: ({ children }: any) => (
    <h1 className="mt-8 mb-4 text-3xl font-semibold text-white md:mt-12 md:mb-6 lg:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="mt-8 mb-3 text-2xl font-medium text-white md:mt-10 md:mb-4 lg:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="mt-8 mb-3 text-xl font-medium text-white lg:text-2xl">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="mb-4 text-lg leading-relaxed text-[#888888] md:mb-6 lg:text-xl lg:leading-loose">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="mb-6 list-inside list-disc space-y-2 text-lg text-[#888888]">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-6 list-inside list-decimal space-y-2 text-lg text-[#888888]">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-[#888888]">{children}</li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-medium text-white">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-8 border-l-2 border-white/20 pl-6 text-xl italic text-white/80">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-white/5">
      <table className="min-w-full text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-white/5 text-white">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="text-[#888888]">{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b border-white/5 last:border-0">
      {children}
    </tr>
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-4 font-medium text-white">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4">{children}</td>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => (
    <img
      src={src}
      alt={alt}
      className="my-6 h-auto w-full rounded-lg border border-white/5 bg-white/5 md:my-8"
    />
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

  const articleStructuredData = generateArticleStructuredData(post)

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ]

  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbItems)

  const currentUrl = `https://danyakmallun.com/blog/${post.slug}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <div className="relative mx-auto max-w-2xl py-2 md:py-2">
        {/* Left Sidebar - Share Buttons (Desktop) */}
        <aside className="hidden xl:absolute xl:right-full xl:top-0 xl:mr-12 xl:flex xl:h-full xl:flex-col xl:items-end">
          <div className="sticky top-[50vh] -translate-y-1/2">
            <ShareButtons url={currentUrl} title={post.title} orientation="vertical" />
          </div>
        </aside>

        {/* Main Content */}
        <article className="w-full">
          <div className="mb-6 space-y-6 md:mb-10 md:space-y-8">
            {/* Back Button */}
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
              <span>Back to Writing</span>
            </a>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#888888]">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.category && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{post.category}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
                {post.title}
              </h1>
            </div>
          </div>

          {post.coverImage && (
            <div className="mb-8 w-full overflow-hidden rounded-xl border border-white/5 bg-white/5 md:mb-12">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={630}
                className="h-auto w-full object-cover"
                priority={true}
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Bottom Share Buttons (Mobile Only) */}
          <div className="xl:hidden">
            <ShareButtons url={currentUrl} title={post.title} />
          </div>
        </article>
      </div>
    </>
  )
}


