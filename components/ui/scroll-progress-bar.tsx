'use client'

import { useEffect, useState } from 'react'

export function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight

            if (docHeight > 0) {
                const scrollPercent = (scrollTop / docHeight) * 100
                setProgress(Math.min(scrollPercent, 100))
            }
        }

        window.addEventListener('scroll', updateProgress)
        updateProgress() // Initial check

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div className="fixed left-0 top-0 z-40 h-1 w-full bg-transparent">
            <div
                className="h-full bg-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
