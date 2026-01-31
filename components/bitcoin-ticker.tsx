'use client'

import { useState, useEffect, useRef } from 'react'
import { Bitcoin } from 'lucide-react'

export function BitcoinTicker() {
    const [price, setPrice] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
        wsRef.current = ws

        ws.onopen = () => {
            setLoading(false)
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            const currentPrice = parseFloat(data.p) // 'p' is the price in the trade stream

            setPrice(currentPrice)
        }

        ws.onerror = (error) => {
            console.error('WebSocket error:', error)
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }
    }, [])

    return (
        <div className="flex items-center gap-2 text-sm font-medium border-b border-muted/30 pb-0.5 hover:border-foreground/50 transition-all">
            <Bitcoin className="w-4 h-4 text-[#F7931A]" />
            <span className="text-muted/80">BTC</span>

            {loading || price === null ? (
                <span className="animate-pulse text-muted mt-[1px]">Loading...</span>
            ) : (
                <div className="flex items-center gap-1 font-mono mt-[2px]">
                    <span className="text-foreground transition-colors duration-300 leading-none">
                        ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            )}
        </div>
    )
}
