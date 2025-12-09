'use client'
import { motion } from 'motion/react'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { WORK_EXPERIENCE } from '@/app/data'
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

import { useState, useEffect } from 'react'

export default function WorkPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading to show skeleton
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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

        {/* Timeline Skeleton */}
        <div className="border-l border-white/5 pl-8 space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative space-y-3">
              {/* Dot Skeleton */}
              <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-[#2d2d2d] bg-[#2d2d2d] animate-pulse" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div className="h-7 w-48 bg-[#2d2d2d] rounded animate-pulse" />
                <div className="h-4 w-24 bg-[#2d2d2d] rounded animate-pulse" />
              </div>

              <div className="h-5 w-32 bg-[#2d2d2d] rounded animate-pulse" />

              <div className="space-y-2 pt-1">
                <div className="h-4 w-full bg-[#2d2d2d] rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-[#2d2d2d] rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-[#2d2d2d] rounded animate-pulse" />
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
            Experience
          </h1>
          <p className="text-lg leading-relaxed text-[#888888]">
            My professional journey and career progression.
          </p>
        </div>
      </motion.section>

      {/* Work List */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-12"
      >
        <div className="border-l border-white/5 pl-8 space-y-12">
          {WORK_EXPERIENCE.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-[#888888] bg-[#0f0f0f]" />

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-xl font-medium text-white">
                    {job.company}
                  </h3>
                  <span className="text-sm text-[#888888]">
                    {job.start} — {job.end}
                  </span>
                </div>

                <div className="text-base text-white/80">
                  {job.title}
                </div>

                <p className="text-base leading-relaxed text-[#888888]">
                  {job.description}
                </p>

                {job.link && job.link !== '#' && (
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-white hover:underline underline-offset-4 decoration-white/30"
                  >
                    Company Website <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
} 