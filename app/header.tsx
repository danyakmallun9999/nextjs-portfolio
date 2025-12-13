'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { SOCIAL_LINKS, EMAIL } from './data'

const NAV_ITEMS = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-md transition-all duration-300 transform-gpu">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12 lg:py-8">
        <Link
          href="/"
          className="font-medium font-semibold transition hover:text-foreground lg:text-xl text-foreground"
        >
          danyakmallun
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition lg:text-lg ${pathname.startsWith(item.href)
                ? 'text-foreground'
                : 'text-muted hover:text-foreground'
                }`}
            >
              {item.label}
              {pathname.startsWith(item.href) && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 block h-[2px] w-full bg-foreground"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
