'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
    children: React.ReactNode
    direction?: 'left' | 'right'
    speed?: number
    className?: string
    pauseOnHover?: boolean
}

export function Marquee({
    children,
    direction = 'left',
    speed = 50,
    className,
    pauseOnHover = true,
}: MarqueeProps) {
    return (
        <div className={cn("group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)]", className)}>
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: direction === 'left' ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
                className="flex shrink-0 items-center justify-around [gap:var(--gap)] min-w-full"
            >
                {children}
            </motion.div>
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: direction === 'left' ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
                className="flex shrink-0 items-center justify-around [gap:var(--gap)] min-w-full"
            >
                {children}
            </motion.div>
        </div>
    )
}
