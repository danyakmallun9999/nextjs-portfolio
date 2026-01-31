'use client'

import { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useInView } from 'motion/react'

interface HistoryItem {
    type: 'command' | 'output'
    content: string
}

const COMMANDS = [
    { cmd: 'whoami', output: 'Dany Akmallun' },
    { cmd: 'cat about.txt', output: 'Crypto enthusiast, Web Developer, and lifelong learner exploring the decentralized future.' },
    { cmd: 'ls skills/', output: 'Laravel  Next.js  React  Tailwind  Solidity  Python' },
    { cmd: 'echo $STATUS', output: 'Building & Learning 🚀' },
]

export function AboutTerminal() {
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentText, setCurrentText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Only start animation when in view
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const hasStarted = useRef(false)

    useEffect(() => {
        if (!isInView || hasStarted.current) return
        hasStarted.current = true

        // Start the sequence
        processNextCommand(0)
    }, [isInView])

    const processNextCommand = (index: number) => {
        if (index >= COMMANDS.length) {
            setCurrentLineIndex(index)
            return
        }

        setCurrentLineIndex(index)
        setIsTyping(true)
        const command = COMMANDS[index]
        let charIndex = 0

        const typeInterval = setInterval(() => {
            charIndex++
            setCurrentText(command.cmd.substring(0, charIndex))

            if (charIndex >= command.cmd.length) {
                clearInterval(typeInterval)
                setIsTyping(false)

                // Delay before showing output
                setTimeout(() => {
                    setHistory(prev => [
                        ...prev,
                        { type: 'command', content: command.cmd },
                        { type: 'output', content: command.output }
                    ])
                    setCurrentText('')

                    // Delay before next command
                    setTimeout(() => {
                        processNextCommand(index + 1)
                    }, 800)
                }, 300)
            }
        }, 80) // Typing speed
    }

    return (
        <div ref={containerRef} className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl font-mono text-sm md:text-base my-8 md:my-16">
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 ml-4 text-muted/60">
                    <TerminalIcon size={14} />
                    <span className="text-xs">dany@portfolio:~</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 min-h-[350px] text-zinc-300 space-y-3 font-[family-name:var(--font-fira-code)]">
                {history.map((item, i) => (
                    <div key={i} className={`${item.type === 'command' ? 'text-zinc-100' : 'text-zinc-400 pl-4 md:pl-6 pb-2 block'}`}>
                        {item.type === 'command' && (
                            <div className="flex gap-2 items-center">
                                <span className="text-green-500">➜</span>
                                <span className="text-blue-400">~</span>
                                <span>{item.content}</span>
                            </div>
                        )}
                        {item.type === 'output' && (
                            <div className="leading-relaxed">{item.content}</div>
                        )}
                    </div>
                ))}

                {/* Current Typing Line */}
                {currentLineIndex < COMMANDS.length && (
                    <div className="text-zinc-100 flex gap-2 items-center">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <span>
                            {currentText}
                            <span className="inline-block w-2.5 h-5 bg-zinc-500 align-middle ml-1 animate-pulse" />
                        </span>
                    </div>
                )}

                {/* Completed State Cursor */}
                {currentLineIndex >= COMMANDS.length && (
                    <div className="text-zinc-100 flex gap-2 items-center">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <span className="inline-block w-2.5 h-5 bg-zinc-500 align-middle ml-1 animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    )
}
