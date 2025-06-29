'use client'
import { motion } from 'motion/react'
import { BookOpen, ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { BLOG_POSTS } from '@/app/data'
import Link from 'next/link'

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
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Blog Posts
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
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
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.uid}
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
                      {new Date(post.date).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <Link href={post.link} className="block">
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
                      href={post.link}
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
      </motion.section>

      {/* Empty State (if no posts) */}
      {BLOG_POSTS.length === 0 && (
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