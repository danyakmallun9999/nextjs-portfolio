'use client'

import dynamic from 'next/dynamic'

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
  return (
    <SyntaxHighlighter
      language={language}
      PreTag="div"
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}
