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
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-[#0f0f0f]/80 backdrop-blur-md transition-all duration-300 transform-gpu">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12 lg:py-8">
        <Link
          href="/"
          className="font-medium transition hover:text-white lg:text-lg"
        >
          danyakmallun
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white lg:text-lg"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
