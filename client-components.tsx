'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { TextEffect } from '@/components/ui/text-effect'
import { Spotlight } from '@/components/ui/spotlight'
import { BLOG_POSTS } from '@/app/data'

export const ClientComponents = {
  ReadingTime: () => {
    const [readingTime, setReadingTime] = useState(0)
    
    useEffect(() => {
      const text = document.querySelector('main')?.textContent || ''
      const wordsPerMinute = 200
      const words = text.trim().split(/\s+/).length
      const time = Math.ceil(words / wordsPerMinute)
      setReadingTime(time)
    }, [])

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{readingTime} min read</span>
      </motion.div>
    )
  },

  SocialShare: () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = typeof window !== 'undefined' ? document.title : ''

    const shareData = {
      title: shareText,
      text: 'Check out this interesting article!',
      url: shareUrl,
    }

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share(shareData)
        } catch (err) {
          console.log('Error sharing:', err)
        }
      } else {
        // Fallback to copying URL
        navigator.clipboard.writeText(shareUrl)
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-center gap-4 py-6"
      >
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Share:</span>
        <div className="flex gap-2">
          <motion.button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={handleShare}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-600 text-white transition-colors hover:bg-zinc-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    )
  },

  RelatedPosts: () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
    const relatedPosts = BLOG_POSTS.filter((post: any) => post.link !== currentPath).slice(0, 3)

    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800"
      >
        <TextEffect
          className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100"
          preset="fade-in-blur"
        >
          Related Posts
        </TextEffect>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post: any, index: number) => (
            <motion.article
              key={post.uid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <Spotlight className="from-blue-500/10 via-purple-500/10 to-pink-500/10" size={150} />
              <h3 className="mb-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                {post.title}
              </h3>
              <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
              <motion.a
                href={post.link}
                className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                whileHover={{ x: 4 }}
              >
                Read more
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.article>
          ))}
        </div>
      </motion.section>
    )
  },
} 