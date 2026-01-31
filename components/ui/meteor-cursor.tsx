'use client'

import React, { useEffect, useRef } from 'react'

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
    const particles = useRef<Particle[]>([])
    const cursor = useRef({ x: 0, y: 0 })
    const lastCursor = useRef({ x: 0, y: 0 })
    const animationFrameId = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        const onMouseMove = (e: MouseEvent) => {
            cursor.current.x = e.clientX
            cursor.current.y = e.clientY
        }

        window.addEventListener('mousemove', onMouseMove)

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const randomColor = () => {
            // Golden/Yellow shades
            const colors = [
                'rgba(255, 215, 0, ',   // Gold
                'rgba(255, 223, 0, ',   // Golden Yellow
                'rgba(255, 165, 0, ',   // Orange (for depth)
                'rgba(255, 255, 224, ', // Light Yellow
            ]
            return colors[Math.floor(Math.random() * colors.length)]
        }

        const loop = () => {
            // Smooth cursor movement for the emitter
            const dx = cursor.current.x - lastCursor.current.x
            const dy = cursor.current.y - lastCursor.current.y

            // Only emit particles if moving or random chance to keep it alive when still
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.random() < 0.1) {
                // Provide a continuous trail by interpolating between frames if moving fast
                const dist = Math.sqrt(dx * dx + dy * dy)
                const steps = Math.min(dist, 10) // Limit interpolation steps

                for (let i = 0; i < steps; i++) {
                    const t = i / steps
                    const x = lerp(lastCursor.current.x, cursor.current.x, t)
                    const y = lerp(lastCursor.current.y, cursor.current.y, t)

                    // Spawn particle
                    particles.current.push({
                        x: x + (Math.random() - 0.5) * 4,
                        y: y + (Math.random() - 0.5) * 4,
                        vx: (Math.random() - 0.5) * 0.5, // Slight random drift
                        vy: (Math.random() - 0.5) * 0.5,
                        life: 1.0,
                        maxLife: 1.0,
                        color: randomColor(),
                        size: Math.random() * 4 + 2 // varying size
                    })
                }

                // Extra particles for the "head" sparkle
                if (Math.random() < 0.5) {
                    particles.current.push({
                        x: cursor.current.x,
                        y: cursor.current.y,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        life: 1.0,
                        maxLife: 0.5, // Shorter life for sparks
                        color: 'rgba(255, 255, 255, ', // White hot center
                        size: Math.random() * 2 + 1
                    })
                }
            }

            lastCursor.current.x = lerp(lastCursor.current.x, cursor.current.x, 0.2)
            lastCursor.current.y = lerp(lastCursor.current.y, cursor.current.y, 0.2)

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i]

                p.life -= 0.02
                p.x += p.vx
                p.y += p.vy
                p.size *= 0.95 // Shrink over time

                if (p.life <= 0) {
                    particles.current.splice(i, 1)
                    continue
                }

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color + p.life + ')'
                ctx.fill()

                // Glow effect
                ctx.shadowBlur = 10
                ctx.shadowColor = p.color + '1)'
            }

            // Reset shadow for performance
            ctx.shadowBlur = 0

            animationFrameId.current = requestAnimationFrame(loop)
        }

        loop()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(animationFrameId.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: 'screen' }} // Helps the glow look better on dark backgrounds
        />
    )
}
