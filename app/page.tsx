'use client'
import { motion } from 'motion/react'
import { XIcon, Briefcase, BookOpen, Mail, ExternalLink, ExternalLink as ExternalLinkIcon, Code2, ZoomIn, Eye, Github, Globe, Calendar, Tag } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from './data'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useState, useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

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

type ProjectImageProps = {
  src: string
  project: {
    name: string
    description: string
    link: string
    techStack: string[]
    category: string
  }
}

function ProjectImage({ src, project }: ProjectImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoading(false)
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true)
    setImageError(false)
    setImageLoaded(false)
    setShowOverlay(false)
  }, [src])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.15,
        duration: 0.6,
      }}
    >
      <MorphingDialogTrigger>
        <div
          className="relative group cursor-zoom-in overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        >
          {/* Loading Skeleton */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-video w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
            >
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          )}

          {/* Image */}
          {!imageError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="aspect-video w-full"
            >
              <Image
                src={src}
                alt={project.name}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onLoad={handleImageLoad}
                onError={handleImageError}
                priority={false}
                loading="lazy"
              />
            </motion.div>
          )}

          {/* Error State */}
          {imageError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center"
            >
              <div className="text-zinc-500 dark:text-zinc-400 text-center">
                <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Gambar tidak tersedia</p>
              </div>
            </motion.div>
          )}

          {/* Loading Overlay */}
          {isLoading && !imageError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]"
            >
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <div className="relative">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-400"></div>
                </div>
                <span className="text-sm font-medium">Memuat gambar...</span>
              </div>
            </motion.div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: showOverlay && !isLoading ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="text-white flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-orange-500/30 px-2.5 py-1 text-xs font-medium text-orange-200 backdrop-blur-sm border border-orange-400/30">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 line-clamp-1">{project.name}</h4>
                  <p className="text-xs text-gray-200 opacity-90 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <motion.div
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ZoomIn className="h-4 w-4 text-white" />
                  </motion.div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon className="h-4 w-4 text-white" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Zoom Hint */}
          {!showOverlay && !isLoading && !imageError && imageLoaded && (
            <motion.div
              className="absolute top-4 right-4 text-xs text-white/80 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <div className="flex items-center gap-1.5">
                <ZoomIn className="h-3 w-3" />
                <span>Klik untuk memperbesar</span>
              </div>
            </motion.div>
          )}
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-w-5xl mx-auto rounded-2xl bg-zinc-50 p-2 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 shadow-2xl">
          <motion.div
            variants={{
              initial: {
                opacity: 0,
                y: 50,
                scale: 0.95,
                filter: 'blur(8px)'
              },
              animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                transition: {
                  type: 'spring',
                  bounce: 0.15,
                  duration: 0.7,
                  delay: 0.1
                }
              },
              exit: {
                opacity: 0,
                y: 50,
                scale: 0.95,
                filter: 'blur(8px)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.5
                }
              }
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
          >
            {!imageError ? (
              <div className="relative">
                <Image
                  src={src}
                  alt={project.name}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                  onError={handleImageError}
                  priority={true}
                />

                {/* Image loading indicator for modal */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl"
                  >
                    <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                      <div className="h-8 w-8 animate-spin rounded-full border-3 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-400"></div>
                      <span className="text-base font-medium">Memuat gambar...</span>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="w-full h-auto max-h-[80vh] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-xl min-h-[400px]">
                <div className="text-zinc-500 dark:text-zinc-400 text-center">
                  <Eye className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium">Gambar tidak tersedia</p>
                  <p className="text-sm mt-2 opacity-70">Coba refresh halaman atau periksa koneksi internet</p>
                </div>
              </div>
            )}

            {/* Project info overlay in modal */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 rounded-b-xl"
              variants={{
                initial: {
                  opacity: 0,
                  y: 30
                },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.4,
                    duration: 0.5,
                    type: 'spring',
                    bounce: 0.1
                  }
                },
                exit: {
                  opacity: 0,
                  y: 30,
                  transition: {
                    duration: 0.3
                  }
                }
              }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="text-white flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center rounded-full bg-orange-500/40 px-3 py-1.5 text-sm font-medium text-orange-200 backdrop-blur-sm border border-orange-400/40">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 drop-shadow-lg">
                      {project.name}
                    </h3>
                    <div className="min-h-[3rem] flex items-start">
                      <p className="text-base leading-relaxed text-zinc-200">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <Tag className="h-4 w-4" />
                    <span className="text-sm font-semibold">Tech Stack:</span>
                  </div>
                  <div className="min-h-[2rem] flex flex-wrap gap-2 items-start">
                    {project.techStack.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        className="inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-white/95 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200 hover:scale-105"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/25 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/35 border border-white/40 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                  <span>Lihat Source Code</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </MorphingDialogContent>

        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white/90 dark:bg-zinc-800/90 p-2 shadow-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
          variants={{
            initial: {
              opacity: 0,
              scale: 0.8,
              y: -20,
              rotate: -90
            },
            animate: {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              transition: {
                delay: 0.5,
                duration: 0.4,
                type: 'spring',
                bounce: 0.2
              },
            },
            exit: {
              opacity: 0,
              scale: 0.8,
              y: -20,
              rotate: 90,
              transition: {
                duration: 0.3
              }
            },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <a
      href={link}
      className="group relative inline-flex shrink-0 items-center justify-center aspect-square w-10 h-10 rounded-full bg-zinc-100 text-sm text-black dark:bg-zinc-800 dark:text-zinc-100 sm:gap-1 sm:px-5 sm:w-auto sm:h-auto sm:aspect-auto hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="hidden sm:inline">{children}</span>
      {(() => {
        if (link.includes('github')) return <FaGithub className="h-10 w-10 p-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
        if (link.includes('twitter')) return <FaTwitter className="h-10 w-10 p-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
        if (link.includes('linkedin')) return <FaLinkedin className="h-10 w-10 p-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
        if (link.includes('instagram')) return <FaInstagram className="h-10 w-10 p-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
        return null
      })()}
    </a>
  )
}

export default function Personal() {
  return (
    <>
      <ScrollProgress />
      <motion.main
        className="space-y-24"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div className="flex-1">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              About Me
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-m">
              Crypto enthusiast & web developer specializing in Laravel, Tailwind, PHP, and modern web stacks. Aktif di testnet project dan gemar eksplorasi ekosistem web3. Also passionate about AI—especially prompt engineering for learning and problem solving. Always curious, always building, always learning.
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-5 text-lg font-medium flex items-center gap-2">
            <Code2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            Project
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.name}
                className="group relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 transition-all duration-300 hover:bg-zinc-400/40 dark:hover:bg-zinc-500/40"
                transition={{ duration: 0.2 }}
              >
                <Spotlight
                  className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white dark:bg-zinc-950">
                  <div className="relative flex w-full flex-col">
                    <div className="relative p-2">
                      <ProjectImage src={project.image} project={project} />
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                              {project.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors drop-shadow-lg">
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block cursor-pointer hover:drop-shadow-2xl transition-all duration-300 hover:text-orange-600 dark:hover:text-orange-400"
                              whileTap={{ scale: 0.98 }}
                            >
                              {project.name}
                            </motion.a>
                          </h4>
                          <div className="min-h-[3rem] flex items-start">
                            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <Tag className="h-4 w-4" />
                          <span className="text-xs font-medium">Tech Stack</span>
                        </div>
                        <div className="min-h-[2rem] flex flex-wrap gap-1 items-start">
                          {project.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 pt-1">
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
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-5 text-lg font-medium flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Work Experience
          </h3>
          <div className="flex flex-col space-y-4">
            {WORK_EXPERIENCE.map((job) => (
              <div
                className="group relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 transition-all duration-300 hover:bg-zinc-400/40 dark:hover:bg-zinc-500/40"
                rel="noopener noreferrer"
                key={job.id}
              >
                <Spotlight
                  className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                  size={64}
                />
                <div className="relative h-full w-full rounded-[15px] bg-white p-6 dark:bg-zinc-950">
                  <div className="relative flex w-full flex-col space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          {job.title}
                        </h4>
                        <p className="text-base font-medium text-blue-600 dark:text-blue-400">
                          {job.company}
                        </p>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {job.start} - {job.end}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-3 text-lg font-medium flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            Blog Posts
          </h3>
          <div className="flex flex-col space-y-0">
            <AnimatedBackground
              enableHover
              className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              }}
            >
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.uid}
                  className="-mx-3 rounded-xl px-3 py-3"
                  href={post.link}
                  data-id={post.uid}
                >
                  <div className="flex flex-col space-y-1">
                    <h4 className="font-normal dark:text-zinc-100 flex items-center gap-2 group">
                      {post.title}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-green-300 dark:text-green-300 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(post.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </AnimatedBackground>
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-5 text-lg font-medium flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Contact Me
          </h3>
          <p className="mb-5 text-zinc-600 dark:text-zinc-400">
            Feel free to contact me at{' '}
            <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
          <div className="flex items-center justify-start space-x-3">
            {SOCIAL_LINKS.map((link) => (
              <MagneticSocialLink key={link.label} link={link.link}>
                {link.label}
              </MagneticSocialLink>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </>
  )
}

