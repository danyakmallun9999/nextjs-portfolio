'use client'

import { Marquee } from '@/components/ui/marquee'
import {
    SiLaravel,
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiNodedotjs,
    SiTypescript,
    SiPython,
    SiMysql,
    SiFigma,
    SiGithub,
    SiDocker,
    SiPostgresql,
    SiVercel,
    SiSupabase,
    SiPrisma,
} from 'react-icons/si'

const TECH_STACK = [
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' }, // Dark mode handle separately if needed
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'GitHub', icon: SiGithub, color: '#181717' },
    { name: 'Vercel', icon: SiVercel, color: '#000000' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
]

export function TechStack() {
    return (
        <section className="space-y-6 py-8">
            <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-semibold text-foreground lg:text-3xl">Tech Stack</h3>
            </div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-4 ">
                <Marquee speed={40} className="[--gap:3rem]">
                    {TECH_STACK.map((tech) => (
                        <div
                            key={tech.name}
                            className="group flex flex-col items-center gap-2 justify-center px-4"
                        >
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/10 bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:border-border/20 group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:scale-110">
                                <tech.icon
                                    className="h-8 w-8 transition-colors duration-300 grayscale group-hover:grayscale-0"
                                    style={{ color: tech.color }}
                                // Note: In dark mode, some blacks might be invisible. 
                                // However, grayscale handles it by making it gray usually. 
                                // For specific "black" icons like Next.js/GitHub in dark mode, we might need adjustments, 
                                // but usually icon libs handle current text color or we force it.
                                // Let's rely on grayscale-0 revealing the color.
                                />
                            </div>
                            <span className="text-xs font-medium text-muted transition-colors group-hover:text-foreground">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
            </div>
        </section>
    )
}
