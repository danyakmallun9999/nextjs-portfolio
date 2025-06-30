'use client'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function LayoutProjects({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gradient-to-b from-gray-100/80 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:from-zinc-950/80" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <main className="mt-8 pb-20">
        {children}
      </main>
    </>
  )
} 