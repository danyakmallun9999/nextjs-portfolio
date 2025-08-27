'use client'

import { useState, useEffect } from 'react'
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react'

interface TerminalProps {
  commands: string[]
  className?: string
  autoType?: boolean
  typingSpeed?: number
}

export function Terminal({ 
  commands, 
  className = '',
  autoType = false,
  typingSpeed = 50 
}: TerminalProps) {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!autoType) return

    const typeCommand = async () => {
      setIsTyping(true)
      const command = commands[currentCommand]
      
      for (let i = 0; i <= command.length; i++) {
        setDisplayedText(command.slice(0, i))
        await new Promise(resolve => setTimeout(resolve, typingSpeed))
      }
      
      setIsTyping(false)
      
      // Move to next command after a delay
      setTimeout(() => {
        setCurrentCommand((prev) => (prev + 1) % commands.length)
        setDisplayedText('')
      }, 2000)
    }

    typeCommand()
  }, [currentCommand, autoType, commands, typingSpeed])

  const handleCopy = async () => {
    const allCommands = commands.join('\n')
    try {
      await navigator.clipboard.writeText(allCommands)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy commands:', err)
    }
  }

  return (
    <div className={`terminal-wrapper my-8 ${className}`}>
      <div className="terminal bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 dark:border-zinc-600 relative">
        {/* Terminal Header */}
        <div className="terminal-header bg-zinc-800 px-4 py-3 flex items-center justify-between border-b border-zinc-700 dark:border-zinc-600">
          <div className="flex items-center space-x-2">
            {/* Window Controls */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* Terminal Icon and Label */}
            <div className="ml-3 flex items-center space-x-2">
              <TerminalIcon className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                Terminal
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
        
        {/* Terminal Content */}
        <div className="terminal-content p-4 bg-black">
          <div className="space-y-2">
            {commands.map((command, index) => (
              <div key={index} className="terminal-line">
                <span className="text-green-400 font-mono text-sm">$ </span>
                <span className="text-zinc-100 font-mono text-sm">
                  {autoType && index === currentCommand ? displayedText : command}
                </span>
                {autoType && index === currentCommand && isTyping && (
                  <span className="text-zinc-100 font-mono text-sm animate-pulse">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
