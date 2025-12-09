'use client'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { PROJECTS } from '@/app/data'
import Link from 'next/link'
import { ImagePreview } from '@/components/ui/image-preview'

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



export default function ProjectsPage() {
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
      <div className="mx-auto max-w-5xl space-y-12 py-12">
        <div className="space-y-6">
          <div className="h-4 w-32 bg-[#2d2d2d] rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 w-64 bg-[#2d2d2d] rounded animate-pulse" />
            <div className="h-6 w-96 bg-[#2d2d2d] rounded animate-pulse" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Image Skeleton */}
              <div className="aspect-video w-full rounded-xl bg-[#2d2d2d] animate-pulse border border-white/5" />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-32 bg-[#2d2d2d] rounded animate-pulse" />
                  <div className="h-8 w-8 rounded-full bg-[#2d2d2d] animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-[#2d2d2d] rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-[#2d2d2d] rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-[#2d2d2d] rounded-full animate-pulse" />
                  <div className="h-5 w-20 bg-[#2d2d2d] rounded-full animate-pulse" />
                </div>
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
      className="mx-auto max-w-5xl space-y-12 py-12"
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
            Selected Work
          </h1>
          <p className="text-lg leading-relaxed text-[#888888]">
            A collection of projects exploring web development, crypto, and design.
          </p>
        </div>
      </motion.section>

      {/* Projects List */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="grid gap-6 md:grid-cols-2 lg:gap-8"
      >
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col gap-4"
          >
            {/* Project Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5 border border-white/5">
              <ImagePreview
                src={project.image}
                alt={project.name}
                width={1200}
                height={630}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-white lg:text-2xl group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <p className="text-sm leading-relaxed text-[#888888] line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-xs text-[#888888]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Empty State */}
      {PROJECTS.length === 0 && (
        <div className="text-center py-12 text-[#888888]">
          No projects found.
        </div>
      )}
    </motion.div>
  )
} 