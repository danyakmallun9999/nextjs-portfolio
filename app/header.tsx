'use client'
import Link from 'next/link'
import { SOCIAL_LINKS, EMAIL } from './data'

const NAV_ITEMS = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  return (
    <header className="mb-16 flex items-center justify-between py-6 text-sm text-[#888888]">
      <Link
        href={`mailto:${EMAIL}`}
        className="font-medium transition hover:text-white"
      >
        {EMAIL}
      </Link>

      <div className="flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition hover:text-white"
          >
            {item.label}
          </Link>
        ))}
        {/* Removed divider and social icons for cleaner look as per minimalist design, 
            social icons are usually better placed in a specific 'connect' section or footer 
            in this specific style, but preserving data means we keep them if strictly needed. 
            However, the design reference often puts nav top right. 
            I will keep the nav items as requested but remove the heavy dividers. */}
      </div>
    </header>
  )
}
