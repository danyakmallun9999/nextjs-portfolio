'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
    className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Helper to slugify text
    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
    }

    useEffect(() => {
        const updateHeadings = () => {
            const articleContent = document.querySelector('.prose')
            if (!articleContent) return

            const elements = Array.from(articleContent.querySelectorAll('h2, h3'))
                .map((element) => {
                    let id = element.id
                    const text = element.textContent || ''

                    // Fallback: Generate ID if missing
                    if (!id && text) {
                        id = slugify(text)
                        element.id = id
                    }

                    return {
                        id,
                        text,
                        level: Number(element.tagName.substring(1)),
                    }
                })
                .filter((h) => h.id && h.text) // Ensure valid heading

            // Only update if headings changed to avoid infinite loops
            setHeadings((prev) => {
                if (JSON.stringify(prev) === JSON.stringify(elements)) return prev
                return elements
            })
        }

        // Initial check
        updateHeadings()

        // Observe changes in the article content (for hydration/dynamic loading)
        const observer = new MutationObserver(updateHeadings)
        const article = document.querySelector('.prose')
        if (article) {
            observer.observe(article, { childList: true, subtree: true })
        }

        // Fallback polling (just in case MutationObserver misses hydration)
        const interval = setInterval(updateHeadings, 1000)

        return () => {
            observer.disconnect()
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        if (headings.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '0px 0px -80% 0px' }
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    const TableList = () => (
        <nav className="space-y-2 text-sm">
            <p className="font-medium text-foreground mb-4">On This Page</p>
            {headings.map((heading) => (
                <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(heading.id)
                        if (element) {
                            const headerOffset = 100
                            const elementPosition = element.getBoundingClientRect().top
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            })
                        }
                        setActiveId(heading.id)
                        setIsMobileOpen(false)
                    }}
                    className={cn(
                        'block transition-colors hover:text-foreground',
                        heading.level === 3 && 'pl-4',
                        activeId === heading.id ? 'text-foreground font-medium' : 'text-muted'
                    )}
                >
                    {heading.text}
                </a>
            ))}
        </nav>
    )

    return (
        <div className={cn('', className)}>
            {/* Desktop Sticky TOC */}
            <div className="hidden xl:block">
                <TableList />
            </div>

            {/* Mobile Collapsible TOC */}
            <div className="xl:hidden mb-8 rounded-lg border border-border/10 bg-muted/5 p-4">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="flex w-full items-center justify-between font-medium text-foreground"
                >
                    <span>Table of Contents</span>
                    <span className={`transition-transform duration-200 ${isMobileOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
                {isMobileOpen && (
                    <div className="mt-4 border-t border-border/10 pt-4">
                        <TableList />
                    </div>
                )}
            </div>
        </div>
    )
}
