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
      <div className="code-block bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 dark:border-zinc-600 relative">
        {/* Window Header */}
        <div className="window-header bg-zinc-800 px-4 py-3 flex items-center justify-between border-b border-zinc-700 dark:border-zinc-600">
          <div className="flex items-center space-x-2">
            {/* Window Controls */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* Language Badge */}
            <div className="ml-3 px-3 py-1 bg-zinc-700 rounded-md border border-zinc-600">
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                {language}
              </span>
            </div>
          </div>
          
          {/* Copy Button */}
          <button 
            className="copy-button px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors flex items-center space-x-2"
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
        <div className="code-content p-4">
          <div className="relative">
            {showLineNumbers && (
              <div className="absolute left-0 top-0 w-12 h-full border-r border-zinc-700 bg-zinc-800">
                {/* Line numbers will be added via CSS */}
              </div>
            )}
            <pre 
              className={`text-sm leading-relaxed text-zinc-100 font-mono overflow-x-auto ${
                showLineNumbers ? 'pl-16' : ''
              }`}
            >
              {children}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
