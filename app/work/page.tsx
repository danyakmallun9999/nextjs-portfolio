'use client'
import { motion } from 'motion/react'
import { Briefcase, ArrowLeft, ExternalLink } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
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

export default function WorkPage() {
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
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Work Experience
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              My professional journey and career progression
            </p>
          </div>
        </div>
      </motion.section>

      {/* Work Experience Timeline */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500"></div>

          {/* Work Items */}
          <div className="space-y-8">
            {WORK_EXPERIENCE.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-zinc-950 shadow-lg group-hover:scale-125 transition-transform duration-300 z-10"></div>

                {/* Work Card */}
                <div className="ml-16">
                  <motion.article
                    className="group relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 transition-all duration-300 hover:bg-zinc-400/40 dark:hover:bg-zinc-500/40"
                    whileHover={{ y: -2 }}
                  >
                    <Spotlight
                      className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                      size={64}
                    />
                    <div className="relative h-full w-full rounded-[15px] bg-white dark:bg-zinc-950 p-6">
                      <div className="relative flex w-full flex-col space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {job.start} - {job.end}
                              </span>
                              {job.link !== '#' && (
                                <motion.a
                                  href={job.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                  whileHover={{ x: 2 }}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Company Website</span>
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {job.description}
                          </p>
                        </div>

                        {/* Progress Indicator */}
                        {index < WORK_EXPERIENCE.length - 1 && (
                          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-2">
                            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
                            <span>Next: {WORK_EXPERIENCE[index + 1].title} at {WORK_EXPERIENCE[index + 1].company}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
} 