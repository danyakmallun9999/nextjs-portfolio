'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Dynamically import SyntaxHighlighter to avoid SSR issues
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false,
})

interface SyntaxHighlighterProps {
  language: string
  children: string
  [key: string]: any
}

export default function CodeHighlighter({ language, children, ...props }: SyntaxHighlighterProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [style, setStyle] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    
    // Dynamically import themes based on current theme
    const loadTheme = async () => {
      const currentTheme = resolvedTheme || 'light'
      try {
        const themes = await import('react-syntax-highlighter/dist/esm/styles/hljs')
        if (currentTheme === 'dark') {
          setStyle(themes.a11yDark)
        } else {
          setStyle(themes.a11yLight)
        }
      } catch (error) {
        console.error('Error loading syntax highlighting theme:', error)
        // Fallback to a basic style
        setStyle({
          backgroundColor: currentTheme === 'dark' ? '#1f2937' : '#f9fafb',
          color: currentTheme === 'dark' ? '#f3f4f6' : '#1f2937',
        })
      }
    }
    
    loadTheme()
  }, [resolvedTheme])

  // Use resolvedTheme to get the actual theme (system preference)
  const currentTheme = mounted ? resolvedTheme : 'light'

  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      PreTag="div"
      customStyle={{
        backgroundColor: currentTheme === 'dark' ? '#1f2937' : '#f9fafb',
        border: currentTheme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}
