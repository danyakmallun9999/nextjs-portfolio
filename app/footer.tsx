'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { TextLoop } from '@/components/ui/text-loop'
import { SOCIAL_LINKS } from './data'
import { BitcoinTicker } from '@/components/bitcoin-ticker'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/10 py-12">
      <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex flex-col space-y-2">
          <a href="https://github.com/danyakmallun9999" target="_blank" className="group transition-colors duration-200">
            <TextLoop className="text-sm text-muted group-hover:text-foreground lg:text-base">
              <span>© 2025 Dany Akmallun Ni'am.</span>
              <span>All rights reserved.</span>
            </TextLoop>
          </a>
          <p className="text-xs text-muted/80 lg:text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center md:gap-6">
          <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-6">
            <BitcoinTicker />
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6">
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

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
