'use client'
import { motion } from 'motion/react'
import { BookOpen, ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { CategoryFilter } from '@/components/ui/category-filter'
import { BlogPost } from '@/lib/blog'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const POSTS_PER_PAGE = 3

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories')
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        // Fetch posts
        const postsResponse = await fetch('/api/blog-posts')
        const postsData = await postsResponse.json()
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fetch posts when category changes
  useEffect(() => {
    async function fetchPostsByCategory() {
      if (!selectedCategory) return

      try {
        const response = await fetch(
          `/api/blog-posts?category=${encodeURIComponent(selectedCategory)}`,
        )
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts by category:', error)
      }
    }

    if (selectedCategory) {
      fetchPostsByCategory()
    } else {
      // Fetch all posts when no category is selected
      fetch('/api/blog-posts')
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error('Error fetching all posts:', error))
    }
  }, [selectedCategory])

  // Filter posts by category
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts

  // Posts are already sorted by date (newest first) from lib/blog.ts
  // No need for additional sorting here

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const endIdx = startIdx + POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIdx, endIdx)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />
      </div>

      {/* Header Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative"
      >
        <div className="mb-8 flex items-center gap-4 sm:mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:mb-10">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Blog Posts
            </h1>
          </div>
          <p className="ml-8 text-sm text-zinc-600 dark:text-zinc-400">
            Thoughts, insights, and discoveries about technology and beyond
          </p>
        </div>
      </motion.section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          className="relative z-10"
        >
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            totalPosts={posts.length}
            filteredPosts={filteredPosts.length}
          />
        </motion.section>
      )}

      {/* Blog Posts List - Single Column */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative z-0"
      >
        <div className="space-y-4 sm:space-y-6">
          {paginatedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-zinc-300/30 p-[1px] transition-all duration-300 hover:bg-zinc-400/40 sm:rounded-2xl dark:bg-zinc-600/30 dark:hover:bg-zinc-500/40"
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[11px] bg-white p-4 sm:rounded-[15px] sm:p-6 dark:bg-zinc-950">
                <div className="flex flex-col">
                  {/* Date and Category */}
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">
                        {new Date(post.publishedAt).toLocaleDateString(
                          'id-ID',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </span>
                    </div>
                    {post.category && (
                      <span
                        className="w-fit max-w-[120px] truncate rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600 sm:max-w-[150px] dark:bg-zinc-800 dark:text-zinc-400"
                        title={post.category}
                      >
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-lg font-medium text-zinc-900 transition-colors group-hover:text-green-600 dark:text-zinc-100 dark:group-hover:text-green-400">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex-shrink-0 rounded-full bg-green-50 px-2 py-1 text-xs text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="flex justify-end">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <span>Read more</span>
                      <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination Controls - Mobile Responsive */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded bg-zinc-200 px-3 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 dark:text-zinc-200"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Tentukan range halaman yang mau ditampilkan (3 tombol)
                const start = Math.max(1, currentPage - 1)
                const end = Math.min(totalPages, currentPage + 1)
                return page >= start && page <= end
              })
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded px-3 py-2 text-sm ${
                    currentPage === page
                      ? 'bg-green-600 text-white dark:bg-green-400 dark:text-zinc-900'
                      : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded bg-zinc-200 px-3 py-2 text-sm text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 dark:text-zinc-200"
            >
              Next
            </button>
          </div>
        )}
      </motion.section>

      {/* Empty State */}
      {paginatedPosts.length === 0 && !loading && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          className="py-12 text-center"
        >
          <BookOpen className="mx-auto mb-4 h-16 w-16 text-zinc-400 dark:text-zinc-600" />
          <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {selectedCategory
              ? `No posts in "${selectedCategory}"`
              : 'No posts yet'}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            {selectedCategory
              ? 'Try selecting a different category or clear the filter.'
              : 'Check back soon for new content!'}
          </p>
        </motion.section>
      )}
    </motion.div>
  )
}
