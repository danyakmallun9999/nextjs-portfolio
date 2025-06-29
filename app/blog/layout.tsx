'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Spotlight } from '@/components/ui/spotlight'
import { TextEffect } from '@/components/ui/text-effect'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const [isCopied, setIsCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    // Ensure we get the URL after component is mounted
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setText('Copy')
        setIsCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const handleCopy = async () => {
    try {
      // Get the current URL again to ensure it's up to date
      const urlToCopy = window.location.href
      
      if (!urlToCopy) {
        console.error('No URL available to copy')
        return
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlToCopy)
        setText('Copied')
        setIsCopied(true)
        console.log('URL copied successfully:', urlToCopy)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = urlToCopy
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (successful) {
          setText('Copied')
          setIsCopied(true)
          console.log('URL copied successfully (fallback):', urlToCopy)
        } else {
          throw new Error('Fallback copy failed')
        }
      }
    } catch (error) {
      console.error('Failed to copy URL: ', error)
      // Show the URL in an alert as last resort
      const urlToShow = window.location.href || currentUrl
      alert(`URL: ${urlToShow}`)
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      className="group relative flex items-center gap-1 rounded-sm border border-zinc-200 bg-white/50 px-4 py-0 text-xs text-zinc-600 transition-all duration-200 hover:border-zinc-300 hover:bg-white/80 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900/80"
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={`Copy URL: ${currentUrl}`}
    >
      <Spotlight className="from-blue-500/20 via-purple-500/20 to-pink-500/20" size={80} />
      <svg
        className={`h-3 w-3 transition-colors ${isCopied ? 'text-green-500' : 'text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isCopied ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        )}
      </svg>
      <TextMorph>{text}</TextMorph>
      <span className="inline text-xs">URL</span>
    </motion.button>
  )
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="group fixed left-1/2 bottom-0 mb-6 -translate-x-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-110 sm:h-12 sm:w-12"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Spotlight className="from-white/20 via-white/10 to-transparent" size={100} />
          <svg className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-30 h-1 w-full bg-zinc-200 dark:bg-zinc-800">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

function TableOfContents() {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
    setHeadings(elements as HTMLHeadingElement[])

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    elements.forEach((elem) => observer.observe(elem))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="fixed left-4 top-32 hidden w-48 space-y-2 xl:block">
      <TextEffect
        className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400"
        preset="fade"
      >
        Table of Contents
      </TextEffect>
      <ul className="space-y-1">
        {headings.map((heading, index) => (
          <motion.li
            key={heading.id || `heading-${index}`}
            className={`text-sm transition-colors ${
              activeId === heading.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
            style={{
              paddingLeft: heading.tagName === 'H3' ? '1rem' : '0',
            }}
          >
            <a
              href={`#${heading.id}`}
              className="block py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => {
                e.preventDefault()
                heading.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {heading.textContent}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ReadingProgress />
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gradient-to-b from-gray-100/80 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:from-zinc-950/80" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        springOptions={{
          bounce: 0,
        }}
      />

      <TableOfContents />

      <main className="prose prose-gray mt-8 pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-semibold prose-h3:tracking-tight prose-h4:font-semibold prose-h5:text-lg prose-h5:font-semibold prose-h6:text-base prose-h6:font-semibold prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50/80 prose-blockquote:via-purple-50/60 prose-blockquote:to-blue-50/80 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-lg prose-blockquote:shadow-sm dark:prose-blockquote:from-blue-950/30 dark:prose-blockquote:via-purple-950/20 dark:prose-blockquote:to-blue-950/30 dark:prose-blockquote:shadow-zinc-900/20 prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm dark:prose-code:bg-zinc-800 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 dark:prose-pre:bg-zinc-950">
        <div className="flex justify-end mb-1">
          <CopyButton />
        </div>
        {children}
      </main>

      <BackToTop />
    </>
  )
}
