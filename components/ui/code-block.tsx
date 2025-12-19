'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  children: React.ReactNode
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  children,
  language = 'text',
  showLineNumbers = false,
  className = ''
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const codeElement = children as any
    const codeText = codeElement?.props?.children || codeElement

    try {
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className={`code-block-wrapper my-8 ${className}`}>
      <div className="code-block bg-card dark:bg-card rounded-xl overflow-hidden relative">
        {/* Window Header */}
        <div className="window-header bg-muted/30 dark:bg-muted/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Window Controls */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            {/* Language Badge */}
            <div className="ml-3 px-3 py-1 bg-muted/50 dark:bg-muted/50 rounded-md border border-border/50 dark:border-border/50">
              <span className="text-xs font-mono text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                {language}
              </span>
            </div>
          </div>

          {/* Copy Button */}
          <button
            className="copy-button px-3 py-1.5 text-xs font-medium text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground bg-muted/50 dark:bg-muted/50 hover:bg-muted dark:hover:bg-muted rounded-md transition-colors flex items-center space-x-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="code-content p-4 bg-card dark:bg-card overflow-x-auto">
          <div className="relative">
            {showLineNumbers && (
              <div className="absolute left-0 top-0 w-12 h-full border-r border-zinc-700 dark:border-zinc-700 bg-zinc-800 dark:bg-zinc-800">
                {/* Line numbers will be added via CSS */}
              </div>
            )}
            <pre
              className={`text-sm leading-relaxed text-foreground dark:text-foreground font-mono overflow-x-auto bg-transparent ${showLineNumbers ? 'pl-16' : ''}`}
            >
              {children}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
