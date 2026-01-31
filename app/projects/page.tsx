'use client'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowLeft, Github } from 'lucide-react'
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
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    // Simulate loading to show skeleton
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-12 py-2">
        <div className="space-y-6">
          <div className="h-4 w-32 bg-muted/20 rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 w-64 bg-muted/20 rounded animate-pulse" />
            <div className="h-6 w-96 bg-muted/20 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-6 p-5 rounded-lg border border-border/10 bg-card dark:bg-white/[0.02]">
              {/* Image Skeleton */}
              <div className="aspect-video w-full rounded-lg bg-muted/20 animate-pulse border border-border/5" />

              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="h-7 w-2/3 bg-muted/20 rounded animate-pulse" />
                  <div className="h-8 w-8 rounded-full bg-muted/20 animate-pulse shrink-0" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-muted/20 rounded animate-pulse" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-20 bg-muted/20 rounded-full animate-pulse" />
                  <div className="h-6 w-24 bg-muted/20 rounded-full animate-pulse" />
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
      className="mx-auto max-w-6xl space-y-8 py-0 md:px-4"
    >
      {/* Header Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="space-y-4 max-w-2xl"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-foreground lg:text-5xl tracking-tight">
            Selected Work
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            A collection of projects exploring web development, crypto, and design.
            Each piece represents a unique challenge and solution.
          </p>
        </div>
      </motion.section>

      {/* Projects List */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="grid gap-4 md:gap-8 md:grid-cols-2 lg:gap-10"
      >
        {[...PROJECTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, visibleCount)
          .map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col gap-6 p-3 rounded-lg border border-border/10 bg-card dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/[0.04] hover:border-border/20 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5 dark:bg-white/5 border border-border/5">
                <ImagePreview
                  src={project.image}
                  alt={project.name}
                  width={1200}
                  height={630}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-muted">
                      {project.category}
                    </div>
                  </div>

                  <h2 className="text-2xl font-medium text-foreground group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h2>

                  <p className="text-base leading-relaxed text-muted line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/5 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-medium text-muted transition-colors group-hover:text-foreground group-hover:border-border/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-muted">
                    View details <ArrowUpRight className="h-4 w-4" />
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 shrink-0 rounded-full border border-border/10 bg-black/5 dark:bg-white/5 p-2 text-foreground transition-colors hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground hover:scale-110"
                      aria-label={`View ${project.name} source code on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Overlay Link for entire card */}
              <Link
                href={`/projects/${project.id}`}
                className="absolute inset-0 z-0 rounded-lg focus:outline-none"
              >
                <span className="sr-only">View {project.name} details</span>
              </Link>
            </motion.article>
          ))}
      </motion.section>

      {/* Load More Button */}
      {visibleCount < PROJECTS.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-8"
        >
          <button
            onClick={() => setVisibleCount(PROJECTS.length)}
            className="rounded-full border border-border/20 bg-transparent px-8 py-3 text-sm font-medium text-muted transition-colors hover:border-border/40 hover:text-foreground"
          >
            Lihat Project Lainnya
          </button>
        </motion.div>
      )}

      {/* Empty State */}
      {PROJECTS.length === 0 && (
        <div className="text-center py-12 text-muted">
          No projects found.
        </div>
      )}
    </motion.div>
  )
} 