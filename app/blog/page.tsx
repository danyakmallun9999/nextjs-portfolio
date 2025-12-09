'use client'
import { motion } from 'motion/react'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { CategoryFilter } from '@/components/ui/category-filter'
import { BlogPost } from '@/lib/blog';
import Link from 'next/link'
import Image from 'next/image'
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
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const POSTS_PER_PAGE = 5

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
        const response = await fetch(`/api/blog-posts?category=${encodeURIComponent(selectedCategory)}`)
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
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching all posts:', error))
    }
  }, [selectedCategory])

  // Filter posts by category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts

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
      <div className="mx-auto max-w-2xl space-y-12 py-12">
        {/* Header Skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-32 bg-[#2d2d2d] rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 w-48 bg-[#2d2d2d] rounded animate-pulse" />
            <div className="h-6 w-96 bg-[#2d2d2d] rounded animate-pulse" />
          </div>
        </div>

        {/* List Skeleton */}
        <div className="space-y-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-6 sm:flex-row sm:items-start border-b border-white/5 pb-8 last:border-0">
              {/* Image Skeleton */}
              <div className="relative aspect-video w-full flex-shrink-0 rounded-lg sm:w-48 bg-[#2d2d2d] animate-pulse" />

              {/* Content Skeleton */}
              <div className="flex-1 space-y-4">
                <div className="h-4 w-32 bg-[#2d2d2d] rounded animate-pulse" />
                <div className="h-7 w-3/4 bg-[#2d2d2d] rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-[#2d2d2d] rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-[#2d2d2d] rounded animate-pulse" />
                </div>
                <div className="h-4 w-24 bg-[#2d2d2d] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl space-y-12 py-12"
    >
      {/* Header Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-6"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-white lg:text-5xl">
            Writing
          </h1>
          <p className="text-lg leading-relaxed text-[#888888]">
            Thoughts, insights, and discoveries about technology and beyond.
          </p>
        </div>
      </motion.section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          className="flex flex-wrap gap-2"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${!selectedCategory ? 'bg-white text-black' : 'bg-white/5 text-[#888888] hover:bg-white/10 hover:text-white'}`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${selectedCategory === category ? 'bg-white text-black' : 'bg-white/5 text-[#888888] hover:bg-white/10 hover:text-white'}`}
            >
              {category}
            </button>
          ))}
        </motion.section>
      )}

      {/* Blog Posts List */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-8"
      >
        {paginatedPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group border-b border-white/5 pb-8 last:border-0"
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-col gap-6 sm:flex-row sm:items-start group">
              {post.coverImage && (
                <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden rounded-lg sm:w-48 bg-white/5 border border-white/5">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>
              )}

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-sm text-[#888888]">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {post.category && (
                    <span className="capitalize">{post.category}</span>
                  )}
                </div>

                <h2 className="text-2xl font-medium text-white group-hover:text-[#888888] transition-colors">
                  {post.title}
                </h2>

                <p className="text-base text-[#888888] leading-relaxed line-clamp-2">
                  {post.description}
                </p>

                <div className="inline-flex items-center gap-1 text-sm text-white group-hover:underline underline-offset-4 decoration-white/30">
                  Read article <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
          >
            Previous
          </button>
          <span className="flex items-center px-4 text-sm text-[#888888]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm rounded-lg border border-white/5 bg-white/5 text-white disabled:opacity-50 hover:bg-white/10 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {paginatedPosts.length === 0 && !loading && (
        <div className="text-center py-12 text-[#888888]">
          No posts found.
        </div>
      )}
    </motion.div>
  )
} 