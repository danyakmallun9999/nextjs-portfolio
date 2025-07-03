'use client'
import { motion } from 'motion/react'
import { XIcon, Briefcase, BookOpen, Mail, ExternalLink, ExternalLink as ExternalLinkIcon, Code2, ZoomIn, Eye, Github, Globe, Calendar, Tag } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
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
import { ImagePreview } from '@/components/ui/image-preview'
import ParticlesBg from '@/components/ui/particles-bg'

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
  return (
    <ImagePreview
      src={src}
      alt={project.name}
      title={project.name}
      description={project.description}
      category={project.category}
      techStack={project.techStack}
      link={project.link}
      width={600}
      height={400}
      className="w-full h-full object-cover"
    />
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
      <ParticlesBg />
      <motion.main
        className="relative space-y-24"
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
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Code2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              Latest Projects
            </h3>
            <Link
              href="/projects"
              className="group flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
            >
              <span>View all projects</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Show only the 2 most recent projects */}
            {PROJECTS.slice(-2).map((project) => (
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
          {/* Instructions to view all projects */}
          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Klik "View all projects" di atas untuk melihat semua proyek
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Latest Work Experience
            </h3>
            <Link
              href="/work"
              className="group flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>View all work</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            {/* Show only the latest work experience */}
            {(() => {
              const latestJob = WORK_EXPERIENCE[WORK_EXPERIENCE.length - 1];
              return (
                <div
                  className="group relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 transition-all duration-300 hover:bg-zinc-400/40 dark:hover:bg-zinc-500/40"
                  rel="noopener noreferrer"
                  key={latestJob.id}
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
                            {latestJob.title}
                          </h4>
                          <p className="text-base font-medium text-blue-600 dark:text-blue-400">
                            {latestJob.company}
                          </p>
                        </div>
                        <div className="ml-4 flex flex-col items-end">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {latestJob.start} - {latestJob.end}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {latestJob.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          {/* Instructions to view all work */}
          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Klik "View all work" di atas untuk melihat detail lengkap pengalaman kerja
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              Latest Blog Posts
            </h3>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              <span>View all posts</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
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
              {/* Show only the 3 most recent blog posts */}
              {BLOG_POSTS
                .slice() // copy array agar tidak mutasi original
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map((post) => (
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
          {/* Instructions to view all posts */}
          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Klik "View all posts" di atas untuk melihat semua artikel blog
            </p>
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

