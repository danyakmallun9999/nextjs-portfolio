'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    color: string
    size: number
}

export const MeteorCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const cursorRef = useRef<HTMLDivElement>(null) // Ref for the custom cursor element
    const particles = useRef<Particle[]>([])
    const cursor = useRef({ x: 0, y: 0 })
    const lastCursor = useRef({ x: 0, y: 0 })
    const animationFrameId = useRef<number>(0)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        // Prevent running on touch devices (pointer: coarse)
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

        const canvas = canvasRef.current
        const cursorEl = cursorRef.current
        if (!canvas || !cursorEl) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Hide default cursor
        document.body.style.cursor = 'none'

        // Check for hoverables
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'A' ||
                (e.target as HTMLElement).tagName === 'BUTTON' ||
                (e.target as HTMLElement).closest('a') ||
                (e.target as HTMLElement).closest('button')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }
        window.addEventListener('mouseover', handleMouseOver)

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        const onMouseMove = (e: MouseEvent) => {
            cursor.current.x = e.clientX
            cursor.current.y = e.clientY

            // Move the custom cursor element directly for performance
            if (cursorEl) {
                cursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            }
        }

        window.addEventListener('mousemove', onMouseMove)

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const randomColor = () => {
            const colors = [
                'rgba(255, 215, 0, ',   // Gold
                'rgba(255, 223, 0, ',   // Golden Yellow
                'rgba(255, 165, 0, ',   // Orange
                'rgba(255, 255, 224, ', // Light Yellow
            ]
            return colors[Math.floor(Math.random() * colors.length)]
        }

        const loop = () => {
            const dx = cursor.current.x - lastCursor.current.x
            const dy = cursor.current.y - lastCursor.current.y

            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.random() < 0.1) {
                const dist = Math.sqrt(dx * dx + dy * dy)
                const steps = Math.min(dist, 10)

                for (let i = 0; i < steps; i++) {
                    const t = i / steps
                    const x = lerp(lastCursor.current.x, cursor.current.x, t)
                    const y = lerp(lastCursor.current.y, cursor.current.y, t)

                    particles.current.push({
                        x: x + (Math.random() - 0.5) * 4,
                        y: y + (Math.random() - 0.5) * 4,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        life: 1.0,
                        maxLife: 1.0,
                        color: randomColor(),
                        size: Math.random() * 4 + 2
                    })
                }

                if (Math.random() < 0.5) {
                    particles.current.push({
                        x: cursor.current.x,
                        y: cursor.current.y,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        life: 1.0,
                        maxLife: 0.5,
                        color: 'rgba(255, 255, 255, ',
                        size: Math.random() * 2 + 1
                    })
                }
            }

            lastCursor.current.x = lerp(lastCursor.current.x, cursor.current.x, 0.2)
            lastCursor.current.y = lerp(lastCursor.current.y, cursor.current.y, 0.2)

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i]
                p.life -= 0.02
                p.x += p.vx
                p.y += p.vy
                p.size *= 0.95

                if (p.life <= 0) {
                    particles.current.splice(i, 1)
                    continue
                }

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color + p.life + ')'
                ctx.fill()
                ctx.shadowBlur = 10
                ctx.shadowColor = p.color + '1)'
            }
            ctx.shadowBlur = 0

            animationFrameId.current = requestAnimationFrame(loop)
        }

        loop()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            cancelAnimationFrame(animationFrameId.current)
            document.body.style.cursor = 'auto' // Restore cursor on unmount
        }
    }, [])

    return (
        <>
            {/* Trail Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-50 hidden md:block"
                style={{ mixBlendMode: 'screen' }}
            />

            {/* Custom Cursor Icon */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                style={{
                    // Initial off-screen position to prevent flash
                    transform: 'translate3d(-100px, -100px, 0)',
                }}
            >
                <div
                    className={`relative -ml-3 -mt-3 w-6 h-6 transition-transform duration-200 ${isHovering ? 'scale-150' : 'scale-100'}`}
                >
                    {/* Bitcoin Cursor SVG */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
                    >
                        <circle cx="12" cy="12" r="12" fill="#F7931A" />
                        <text
                            x="50%"
                            y="52%"
                            dominantBaseline="central"
                            textAnchor="middle"
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                            ₿
                        </text>
                    </svg>
                </div>
            </div>
        </>
    )
}
