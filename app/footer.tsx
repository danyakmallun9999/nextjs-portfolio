'use client'
import { ThemeToggle } from '@/components/theme-toggle'
import { TextLoop } from '@/components/ui/text-loop'
import { SOCIAL_LINKS } from './data'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/10 py-12">
      <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex flex-col space-y-2">
          <a href="https://github.com/danyakmallun9999" target="_blank" className="group transition-colors duration-200">
            <TextLoop className="text-sm text-muted group-hover:text-foreground lg:text-base">
              <span>© 2025 Dany Akmallun.</span>
              <span>All rights reserved.</span>
            </TextLoop>
          </a>
          <p className="text-xs text-muted/80 lg:text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted transition hover:text-foreground lg:text-base"
              >
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
