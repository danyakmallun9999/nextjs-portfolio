'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex flex-col items-start gap-2">
        <img
          src="/profile.jpeg"
          alt="Profile Photo"
          className="w-16 h-16 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
        />
        <Link href="/" className="font-medium text-black dark:text-white">
          Dany Akmallun Ni'am
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Crypto Enthusiast | Web Developer | Prompt Engineer
        </TextEffect>
      </div>
    </header>
  )
}
