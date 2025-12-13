'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Calendar, Github, Twitter, Linkedin, Instagram } from 'lucide-react'


import { BlogPost } from '@/lib/blog'
import { EMAIL, PROJECTS, SOCIAL_LINKS, WORK_EXPERIENCE } from './data'

const CLIENTS: string[] = [] // Removed as per request
const SERVICES: any[] = [] // Removed as per request

const container = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.35 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function Personal() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blog-posts')
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const latestProjects = PROJECTS.slice(-2)
  const latestPosts = blogPosts
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 2)

  return (
    <>

      <div className="relative isolate min-h-screen w-full overflow-hidden pb-20">
        {/* Background Gradient/Blobs - Made subtle/removed as per minimalist style */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[500px] rounded-full bg-white/5 blur-[100px]" />
        </div>

        <motion.main
          className="relative mx-auto flex max-w-4xl flex-col gap-24"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.section
            className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center text-center pt-4 lg:pt-0 lg:min-h-[calc(100vh-160px)]"
            variants={item}
          >
            <div className="relative mb-8 h-32 w-32 overflow-hidden rounded-full ring-4 ring-white/5 lg:mb-10 lg:h-48 lg:w-48">
              <Image
                src="/profile.png"
                alt="Foto Profil Dany Akmallun"
                width={192}
                height={192}
                className="h-full w-full object-cover grayscale transition hover:grayscale-0"
                priority
              />
            </div>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted lg:mb-8 lg:text-base lg:tracking-[0.25em]">
              Hi, I&apos;m Dany 👋
            </p>
            <div className="mb-8 max-w-2xl space-y-6 lg:max-w-4xl lg:space-y-8">
              <h1 className="text-3xl font-semibold text-foreground sm:text-5xl lg:text-5xl lg:leading-tight">
                Crypto enthusiast • Web Developer • Lifelong learner
              </h1>
              <p className="text-base leading-relaxed text-muted lg:text-lg lg:leading-loose">
                Crypto enthusiast & web developer specializing in Laravel, Tailwind, PHP, and modern web stacks. Aktif di testnet project dan gemar eksplorasi ekosistem web3. Also passionate about AI—especially prompt engineering for learning and problem solving. Always curious, always building, always learning.
              </p>
              <div className="flex justify-center gap-4 lg:gap-6">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground hover:text-muted transition-colors lg:text-base"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-border/10 bg-black/5 dark:bg-white/5 px-8 py-4 text-sm font-medium text-foreground transition-all hover:border-border/20 hover:bg-black/10 dark:hover:bg-white/10 lg:px-10 lg:py-5 lg:text-base"
            >
              Latest Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:h-5 lg:w-5" />
            </Link>
          </motion.section>

          {/* Removed Clients, About Me Grid, and Services Grid as per request */}

          <motion.section className="space-y-8 py-10 lg:space-y-12 lg:py-20" variants={item}>
            <div className="flex items-center justify-between border-b border-border/10 pb-4 lg:pb-6">
              <h3 className="text-xl font-semibold text-foreground lg:text-3xl">Latest Project</h3>
              <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors lg:text-lg">
                View all <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {latestProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative flex flex-col justify-between rounded-xl border border-border/10 bg-card dark:bg-white/[0.02] p-4 transition-colors hover:bg-black/5 dark:hover:bg-white/[0.04] lg:p-6"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-widest text-muted lg:text-sm">
                          {project.category}
                        </div>
                      </div>

                      <h3 className="text-2xl font-medium text-foreground lg:text-3xl">
                        {project.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted lg:text-lg lg:leading-normal line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-black/5 dark:bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted lg:text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 lg:pt-8">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-muted lg:text-base"
                    >
                      View project <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>

          <motion.section className="space-y-8 lg:space-y-12" variants={item}>
            <div className="flex items-center justify-between border-b border-border/10 pb-4 lg:pb-6">
              <h3 className="text-xl font-semibold text-foreground lg:text-3xl">Latest Experience</h3>
              <Link href="/work" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors lg:text-lg">
                View all <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {WORK_EXPERIENCE.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="group relative flex flex-col gap-3 rounded-xl border border-border/10 bg-card dark:bg-white/[0.02] p-6 transition-colors hover:bg-black/5 dark:hover:bg-white/[0.04] lg:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-medium text-foreground group-hover:text-blue-400 transition-colors lg:text-2xl">
                        {job.title}
                      </h4>
                      <p className="text-sm font-medium text-muted lg:text-lg lg:mt-1">{job.company}</p>
                    </div>
                    <span className="inline-flex self-start sm:self-center items-center rounded-md bg-black/5 dark:bg-white/5 px-2 py-1 text-xs text-muted lg:text-sm lg:px-3 lg:py-1.5">
                      {job.start} - {job.end}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted line-clamp-2 lg:text-lg lg:leading-normal">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="space-y-8 lg:space-y-12" variants={item}>
            <div className="flex items-center justify-between border-b border-border/10 pb-4 lg:pb-6">
              <h3 className="text-xl font-semibold text-foreground lg:text-3xl">Latest Blog</h3>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors lg:text-lg">
                View all <ArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {loading ? (
                <div className="py-8 text-center text-muted lg:text-lg">
                  Loading...
                </div>
              ) : latestPosts.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted lg:text-lg">No blog posts available</div>
              ) : (
                latestPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-4 rounded-xl border border-border/10 bg-card dark:bg-white/[0.02] p-4 transition-colors hover:bg-black/5 dark:hover:bg-white/[0.04] lg:gap-6 lg:p-6"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
                      <Image
                        src={post.coverImage || '/opengraph.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-2 lg:gap-3">
                      <div className="flex items-center gap-2 text-xs text-muted lg:text-sm">
                        <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-foreground group-hover:text-blue-400 transition-colors lg:text-2xl">{post.title}</h4>
                      <p className="text-sm text-muted line-clamp-2 lg:text-lg lg:leading-normal">{post.description}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </motion.section>

          <motion.section
            className="my-20 flex flex-col items-center text-center lg:my-32"
            variants={item}
          >
            <h3 className="mb-4 text-3xl font-semibold text-foreground lg:text-5xl lg:mb-6">
              Contact Me
            </h3>
            <p className="mb-8 text-sm text-muted lg:text-xl lg:mb-12">
              Feel free to contact me at <a href={`mailto:${EMAIL}`} className="text-foreground hover:underline decoration-foreground/30 underline-offset-4 transition-all">{EMAIL}</a>
            </p>
            <div className="flex items-center gap-6 lg:gap-8">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.label === 'Github' ? Github :
                  link.label === 'Twitter' ? Twitter :
                    link.label === 'LinkedIn' ? Linkedin :
                      link.label === 'Instagram' ? Instagram : ArrowUpRight

                return (
                  <a
                    key={link.label}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    <span className="sr-only">{link.label}</span>
                  </a>
                )
              })}
            </div>
          </motion.section>
        </motion.main>
      </div>
    </>
  )
}

