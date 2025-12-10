'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface SyntaxHighlighterProps {
  language: string
  children: string
  [key: string]: any
}

export default function CodeHighlighter({ language, children, ...props }: SyntaxHighlighterProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={a11yDark}
      PreTag="div"
      customStyle={{
        backgroundColor: '#070707',
        border: '1px solid #070707',
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
