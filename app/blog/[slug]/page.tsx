import { getAllBlogPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { Metadata } from 'next'
import CodeHighlighter from '@/app/components/SyntaxHighlighter'
import ShareButtons from '@/app/components/ShareButtons'
import Image from 'next/image'
import { generateArticleStructuredData, generateBreadcrumbStructuredData, BreadcrumbItem } from '@/lib/structured-data'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { TableOfContents } from '@/components/table-of-contents'

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
        ? [`https://danyakmallun.com${post.coverImage}`]
        : ['https://danyakmallun.com/opengraph.jpg'],
      creator: '@danyakmallun',
      site: '@danyakmallun',
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
  // ... (code block component skipped)
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
        className="rounded bg-muted/20 px-1 py-0.5 font-mono text-sm text-foreground"
        {...props}
      >
        {children}
      </code>
    )
  },
  h1: ({ children, ...props }: any) => (
    <h1 className="mt-8 mb-4 text-3xl font-semibold text-foreground md:mt-12 md:mb-6 lg:text-4xl font-[family-name:var(--font-lora)]" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="mt-8 mb-3 text-2xl font-medium text-foreground md:mt-10 md:mb-4 lg:text-3xl font-[family-name:var(--font-lora)]" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="mt-8 mb-3 text-xl font-medium text-foreground lg:text-2xl font-[family-name:var(--font-lora)]" {...props}>
      {children}
    </h3>
  ),
  // ... (other components)
  p: ({ children }: any) => (
    <p className="mb-4 text-lg leading-loose text-muted md:mb-6 lg:text-xl lg:leading-loose font-[family-name:var(--font-lora)]">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="mb-6 list-inside list-disc space-y-2 text-lg text-muted font-[family-name:var(--font-lora)]">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="mb-6 list-inside list-decimal space-y-2 text-lg text-muted font-[family-name:var(--font-lora)]">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-muted font-[family-name:var(--font-lora)] leading-relaxed">{children}</li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-medium text-foreground">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-8 border-l-2 border-border/20 pl-6 text-xl italic text-muted font-[family-name:var(--font-lora)]">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border/10">
      <table className="min-w-full text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-muted/10 text-foreground">{children}</thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="text-muted">{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b border-border/5 last:border-0">
      {children}
    </tr>
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-4 font-medium text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4">{children}</td>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground transition-all"
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
      className="my-6 h-auto w-full rounded-lg border border-border/10 bg-muted/5 md:my-8"
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

  // Fetch related posts (simple logic: same category, exclude current)
  const allPosts = await getAllBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug) // Exclude current post
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === post.category && b.category !== post.category) return -1
      if (a.category !== post.category && b.category === post.category) return 1
      return 0
    })
    .slice(0, 3)

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

        {/* Right Sidebar - Table of Contents (Desktop) */}
        <aside className="hidden xl:absolute xl:left-full xl:top-0 xl:ml-12 xl:flex xl:h-full xl:flex-col xl:items-start">
          <div className="sticky top-[50vh] -translate-y-1/2 w-64 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border/20 scrollbar-track-transparent">
            <TableOfContents />
          </div>
        </aside>

        {/* Main Content */}
        <article className="w-full">
          <div className="mb-6 space-y-6 md:mb-10 md:space-y-6">

            {/* Back Button */}
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Writing</span>
            </a>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-sm text-muted font-medium">
              <div className="flex items-center gap-2">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.category && (
                  <>
                    <span className="text-border/40">•</span>
                    <span className="capitalize text-foreground/80">{post.category}</span>
                  </>
                )}
              </div>
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-foreground lg:text-5xl font-[family-name:var(--font-lora)]">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-3 border-b border-border/10 pb-8">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/10 bg-muted/10">
                <Image
                  src="/profile.png"
                  alt="Dany Akmallun Ni'am"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium text-foreground">Dany Akmallun Ni'am</span>
                <span className="text-muted">Mas mas jawa</span>
              </div>
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
              rehypePlugins={[rehypeSlug]}
              components={components}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Bottom Share Buttons (Mobile Only) */}
          <div className="xl:hidden">
            <ShareButtons url={currentUrl} title={post.title} />
          </div>

          {/* Related Articles (Desktop Only) */}
          <section className="hidden mt-20 border-t border-border/10 pt-10 lg:block">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-foreground font-[family-name:var(--font-lora)]">
                You Might Also Like
              </h3>
              <a href="/blog" className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1">
                View all articles <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <a key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group space-y-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/10 bg-muted/5">
                    {relatedPost.coverImage ? (
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 33vw, 300px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted/10" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <time dateTime={relatedPost.publishedAt}>
                        {new Date(relatedPost.publishedAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                      {relatedPost.category && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{relatedPost.category}</span>
                        </>
                      )}
                    </div>

                    <h4 className="text-lg font-medium text-foreground group-hover:text-muted transition-colors line-clamp-2 leading-snug font-[family-name:var(--font-lora)]">
                      {relatedPost.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
