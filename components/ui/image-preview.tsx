'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImagePreviewProps {
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  techStack?: string[]
  link?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function ImagePreview({
  src,
  alt,
  className,
  width = 600,
  height = 400,
  priority = false
}: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-all duration-300",
        className
      )}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 aspect-video w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  )
} 