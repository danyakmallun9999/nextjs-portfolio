'use client'
import { motion } from 'motion/react'
import { BookOpen, ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { BlogPost } from '@/lib/blog';
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 3

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog-posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Urutkan post berdasarkan tanggal terbaru
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const endIdx = startIdx + POSTS_PER_PAGE
  const paginatedPosts = sortedPosts.slice(startIdx, endIdx)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
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
      {/* Header Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="relative"
      >
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Blog Posts
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Thoughts, insights, and discoveries about technology and beyond
            </p>
          </div>
        </div>
      </motion.section>

      {/* Blog Posts List - Single Column */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="space-y-6">
          {paginatedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 transition-all duration-300 hover:bg-zinc-400/40 dark:hover:bg-zinc-500/40"
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white dark:bg-zinc-950 p-6">
                <div className="flex flex-col">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex justify-end">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors group/link"
                    >
                      <span>Read more</span>
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-green-600 text-white dark:bg-green-400 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </motion.section>

      {/* Empty State */}
      {posts.length === 0 && !loading && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            No posts yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Check back soon for new content!
          </p>
        </motion.section>
      )}
    </motion.div>
  )
} 