'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex flex-col items-start gap-3">
        <div className="relative">
          <img
            src="/profile.jpeg"
            alt="Foto Profil Dany Akmallun"
            className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        <Link href="/" className="font-semibold text-xl text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          Dany Akmallun Ni'am
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
          delay={0.5}
        >
          Penggemar Crypto • Web Developer • Prompt Engineer
        </TextEffect>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
          Membangun masa depan terdesentralisasi
        </p>
      </div>
    </header>
  )
}
