'use client'

import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from 'lucide-react'
import { PROJECTS } from '@/app/data'
import Link from 'next/link'
import { ImagePreview } from '@/components/ui/image-preview'
import { notFound } from 'next/navigation'
import { use } from 'react'

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

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const project = PROJECTS.find((p) => p.id === slug)

    if (!project) {
        notFound()
    }

    return (
        <motion.div
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-6xl space-y-6 py-0 md:px-2"
        >
            {/* Header / Nav */}
            <motion.nav
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="flex items-center justify-between"
            >
                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Projects</span>
                </Link>
            </motion.nav>

            {/* Hero Section */}
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="space-y-8"
            >
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-blue-500 dark:text-blue-400 font-medium tracking-wide text-sm">{project.category}</span>
                        <h1 className="text-4xl font-semibold text-foreground lg:text-5xl tracking-tight font-[family-name:var(--font-lora)]">
                            {project.name}
                        </h1>
                    </div>
                </div>

                {/* Project Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/10 border border-border/10">
                    <ImagePreview
                        src={project.image}
                        alt={project.name}
                        width={1200}
                        height={630}
                        className="h-full w-full object-cover"
                    />
                </div>
            </motion.section>

            <div className="grid md:grid-cols-[1fr_300px] gap-12">
                {/* Main Content */}
                <motion.div
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-10"
                >
                    <div className="space-y-6">
                        <h2 className="text-2xl font-medium text-foreground font-[family-name:var(--font-lora)]">Overview</h2>
                        <div className="prose prose-invert prose-p:text-muted prose-p:leading-loose max-w-none font-[family-name:var(--font-lora)] text-lg">
                            <p>{project.description}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-medium text-foreground font-[family-name:var(--font-lora)]">Technologies</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-sm border border-border/5 bg-muted/10 px-4 py-2 text-sm text-muted transition-colors hover:text-foreground hover:bg-muted/20 hover:border-border/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar Info */}
                <motion.aside
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-8 h-fit md:sticky md:top-24"
                >
                    <div className="p-6 rounded-xl border border-border/10 bg-card dark:bg-white/[0.02]  space-y-6">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-2 rounded-xl border border-border/10 bg-white p-4 transition-all hover:bg-muted/5 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-muted uppercase tracking-wider">Project Link</h3>
                                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </div>
                            <p className="text-sm font-medium text-foreground group-hover:underline decoration-border underline-offset-4 break-all">{project.link.replace(/^https?:\/\//, '')}</p>
                        </a>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted uppercase tracking-wider">Category</h3>
                            <p className="text-foreground">{project.category}</p>
                        </div>
                    </div>
                </motion.aside>
            </div>

        </motion.div>
    )
}
