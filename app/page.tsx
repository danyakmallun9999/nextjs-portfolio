'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Calendar } from 'lucide-react'

import { ScrollProgress } from '@/components/ui/scroll-progress'
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
    .slice(0, 3)

  return (
    <>
      <ScrollProgress />
      <div className="relative isolate min-h-screen w-full overflow-hidden pb-20">
        {/* Background Gradient/Blobs - Made subtle/removed as per minimalist style */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[500px] rounded-full bg-white/5 blur-[100px]" />
        </div>

        <motion.main
          className="relative mx-auto flex max-w-4xl flex-col gap-24 pt-12"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.section
            className="flex flex-col items-center text-center"
            variants={item}
          >
            <div className="relative mb-8 h-32 w-32 overflow-hidden rounded-full ring-4 ring-white/5">
              <Image
                src="/profile.jpeg"
                alt="Foto Profil Dany Akmallun"
                width={128}
                height={128}
                className="h-full w-full object-cover grayscale transition hover:grayscale-0"
                priority
              />
            </div>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[#888888]">
              Hi, I&apos;m Dany 👋
            </p>
            <div className="mb-8 max-w-2xl space-y-6">
              <h1 className="text-3xl font-semibold text-white sm:text-5xl">
                Crypto enthusiast • Web Developer • Lifelong learner
              </h1>
              <p className="text-base leading-relaxed text-[#888888]">
                Crypto enthusiast & web developer specializing in Laravel, Tailwind, PHP, and modern web stacks. Aktif di testnet project dan gemar eksplorasi ekosistem web3. Also passionate about AI—especially prompt engineering for learning and problem solving. Always curious, always building, always learning.
              </p>
              <div className="flex justify-center gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white hover:text-[#888888] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-white/10"
            >
              Latest Shots
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.section>

          {/* Removed Clients, About Me Grid, and Services Grid as per request */}

          <motion.section className="space-y-8 py-10" variants={item}>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xl font-semibold text-white">Latest Shots</h3>
              <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-[#888888] hover:text-white transition-colors">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {latestProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-widest text-[#888888]">
                        {project.category}
                      </div>
                    </div>

                    <h3 className="text-2xl font-medium text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#888888]">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-[#888888]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={project.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-[#888888]"
                    >
                      View project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="space-y-8" variants={item}>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xl font-semibold text-white">Latest Experience</h3>
              <Link href="/work" className="inline-flex items-center gap-1 text-sm text-[#888888] hover:text-white transition-colors">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {WORK_EXPERIENCE.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="group relative flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-sm font-medium text-[#888888]">{job.company}</p>
                    </div>
                    <span className="inline-flex self-start sm:self-center items-center rounded-md bg-white/5 px-2 py-1 text-xs text-[#888888]">
                      {job.start} - {job.end}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[#888888] line-clamp-2">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="space-y-8" variants={item}>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xl font-semibold text-white">Latest Blog</h3>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-[#888888] hover:text-white transition-colors">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="py-8 text-center text-[#888888]">
                  Loading...
                </div>
              ) : latestPosts.length === 0 ? (
                <div className="py-6 text-center text-sm text-[#888888]">No blog posts available</div>
              ) : (
                latestPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2 rounded-xl border border-transparent px-4 py-6 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-2 text-xs text-[#888888]">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-white group-hover:underline decoration-white/30 underline-offset-4">{post.title}</h4>
                    <p className="text-sm text-[#888888] line-clamp-2">{post.description}</p>
                  </Link>
                ))
              )}
            </div>
          </motion.section>

          <motion.section
            className="my-20 flex flex-col items-center text-center"
            variants={item}
          >
            <h3 className="mb-4 text-3xl font-semibold text-white">
              Tell me about your next project
            </h3>
            <p className="mb-8 max-w-lg text-sm text-[#888888]">
              Bangun pengalaman digital yang memukau dengan proses yang terstruktur dan fokus pada hasil.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 border-b border-white pb-0.5 text-sm font-medium text-white transition-opacity hover:opacity-70"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.section>
        </motion.main>
      </div>
    </>
  )
}

