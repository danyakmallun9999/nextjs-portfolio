'use client'
import { motion } from 'motion/react'
import { Code2, ExternalLink, Calendar, ArrowLeft, Tag, Github, Globe } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
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
          <Code2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Projects
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              A collection of my work and creative endeavors
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects List - Single Column */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 transition-all duration-300 hover:bg-zinc-400/40 dark:hover:bg-zinc-500/40"
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white dark:bg-zinc-950">
                <div className="relative flex w-full flex-col">
                  {/* Project Image */}
                  <div className="relative p-2">
                    <ImagePreview
                      src={project.image}
                      alt={project.name}
                      title={project.name}
                      description={project.description}
                      category={project.category}
                      techStack={project.techStack}
                      link={project.link}
                      width={800}
                      height={400}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    {/* Category and Title */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                            {project.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {project.name}
                        </h2>
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 mb-4">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                        <Tag className="h-4 w-4" />
                        <span className="text-xs font-medium">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="h-3 w-3" />
                        <span>Source Code</span>
                      </motion.a>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Globe className="h-3 w-3" />
                        <span>View Project</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Empty State (if no projects) */}
      {PROJECTS.length === 0 && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          className="text-center py-12"
        >
          <Code2 className="w-16 h-16 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            No projects yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Check back soon for new projects!
          </p>
        </motion.section>
      )}
    </motion.div>
  )
} 