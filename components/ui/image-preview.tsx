'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { Eye, ZoomIn, X, ExternalLink, Loader2, Download } from 'lucide-react'
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
  title,
  description,
  category,
  techStack = [],
  link,
  className,
  width = 600,
  height = 400,
  priority = false
}: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleImageLoad = useCallback(() => {
    setIsLoading(false)
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setIsLoading(false)
    setImageError(true)
  }, [])

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true)
    setImageError(false)
    setImageLoaded(false)
    setShowOverlay(false)
  }, [src])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleDownload = async () => {
    if (!src) return
    
    setIsDownloading(true)
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = alt || 'image'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isModalOpen) {
      setIsModalOpen(false)
    }
  }, [isModalOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Thumbnail */}
      <div
        className={cn(
          "relative group cursor-zoom-in overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 transition-all duration-300 hover:shadow-lg",
          className
        )}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-video w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
          >
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        )}

        {/* Image */}
        {!imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="aspect-video w-full"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
            />
          </motion.div>
        )}

        {/* Error State */}
        {imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center"
          >
            <div className="text-zinc-500 dark:text-zinc-400 text-center">
              <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Gambar tidak tersedia</p>
            </div>
          </motion.div>
        )}

        {/* Loading Overlay */}
        {isLoading && !imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]"
          >
            <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm font-medium">Memuat gambar...</span>
            </div>
          </motion.div>
        )}

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: showOverlay && !isLoading ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="text-white flex-1">
                {category && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-orange-500/30 px-2.5 py-1 text-xs font-medium text-orange-200 backdrop-blur-sm border border-orange-400/30">
                      {category}
                    </span>
                  </div>
                )}
                {title && (
                  <h4 className="font-semibold text-sm mb-1 line-clamp-1">{title}</h4>
                )}
                {description && (
                  <p className="text-xs text-gray-200 opacity-90 line-clamp-2">{description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <motion.div
                  className="rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomIn className="h-4 w-4 text-white" />
                </motion.div>
                {link && (
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zoom Hint */}
        {!showOverlay && !isLoading && !imageError && imageLoaded && (
          <motion.div
            className="absolute top-4 right-4 text-xs text-white/80 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <div className="flex items-center gap-1.5">
              <ZoomIn className="h-3 w-3" />
              <span>Klik untuk memperbesar</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-zinc-50 dark:bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative">
                {!imageError ? (
                  <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    priority={true}
                  />
                ) : (
                  <div className="w-full h-auto max-h-[80vh] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center min-h-[400px]">
                    <div className="text-zinc-500 dark:text-zinc-400 text-center">
                      <Eye className="h-20 w-20 mx-auto mb-4 opacity-50" />
                      <p className="text-xl font-medium">Gambar tidak tersedia</p>
                      <p className="text-sm mt-2 opacity-70">Coba refresh halaman atau periksa koneksi internet</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <motion.button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="rounded-full bg-white/90 dark:bg-zinc-800/90 p-2 shadow-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400 animate-spin" />
                    ) : (
                      <Download className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full bg-white/90 dark:bg-zinc-800/90 p-2 shadow-lg backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  </motion.button>
                </div>
              </div>

              {/* Info Panel */}
              {(title || description || category || techStack.length > 0 || link) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"
                >
                  <div className="space-y-4">
                    {category && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-orange-500/20 px-3 py-1.5 text-sm font-medium text-orange-700 dark:text-orange-300">
                          {category}
                        </span>
                      </div>
                    )}
                    
                    {title && (
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {title}
                      </h3>
                    )}
                    
                    {description && (
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {description}
                      </p>
                    )}

                    {techStack.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          Tech Stack:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                              className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {link && (
                      <motion.a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 transition-all hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Lihat Project</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 