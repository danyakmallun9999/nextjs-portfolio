'use client'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-1 text-sm text-zinc-600 dark:text-zinc-400 ${className}`}
    >
      <Link 
        href="/" 
        className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="w-4 h-4 text-zinc-400" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
