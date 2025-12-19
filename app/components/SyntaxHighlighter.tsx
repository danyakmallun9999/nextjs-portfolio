'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const customLight = {
  ...a11yLight,
  hljs: {
    ...a11yLight.hljs,
    background: 'transparent',
    color: '#333333', // Charcoal
  },
}

const customDark = {
  ...a11yDark,
  hljs: {
    ...a11yDark.hljs,
    background: 'transparent',
    color: '#e6e6e6', // Softer White
  },
}

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

  const style = mounted && resolvedTheme === 'light' ? customLight : customDark

  return (
    <div className="code-block my-8 rounded-xl overflow-hidden bg-card">
      <div className="bg-muted/30 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div className="text-xs font-mono text-muted-foreground uppercase">{language}</div>
      </div>
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={style}
          PreTag="div"
          customStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: 0,
            padding: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          {...props}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
