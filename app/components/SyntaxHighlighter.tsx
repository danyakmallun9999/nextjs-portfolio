'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface SyntaxHighlighterProps {
  language: string
  children: string
  [key: string]: any
}

export default function CodeHighlighter({ language, children, ...props }: SyntaxHighlighterProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const style = mounted && resolvedTheme === 'light' ? a11yLight : a11yDark
  const customBg = mounted && resolvedTheme === 'light' ? '#F0EFEA' : '#070707'
  const customBorder = mounted && resolvedTheme === 'light' ? '#F0EFEA' : '#070707'

  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      PreTag="div"
      customStyle={{
        backgroundColor: customBg,
        border: `1px solid ${customBorder}`,
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
