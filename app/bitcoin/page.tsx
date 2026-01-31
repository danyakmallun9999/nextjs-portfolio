'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

// --- Components ---

function GenesisBlock() {
    return (
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="z-10"
            >
                <div className="text-xl md:text-2xl font-mono text-[#F7931A] mb-4 tracking-widest uppercase">
                    The Genesis Block
                </div>
                {/* Changed to use 'text-foreground' explicitly and tweaked gradient for better contrast in light/dark */}
                <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 mb-8 max-w-4xl mx-auto leading-tight">
                    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."
                </h1>
                <p className="text-muted text-sm md:text-base max-w-xl mx-auto italic">
                    — Satoshi Nakamoto's hidden message in Block #0. A reminder of why we build.
                </p>
            </motion.div>

            {/* Subtle Binary Rain Effect Background - ensure text color adapts */}
            <div className="absolute inset-0 opacity-5 pointer-events-none font-mono text-[10px] break-all overflow-hidden flex flex-col justify-center text-foreground">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap">
                        {Math.random() > 0.5 ? '1' : '0'}{Math.random() > 0.5 ? '1' : '0'}010101000110100001100101001000000101010001101001011011010110010101110011001000000011000000110011001011110100101001100001011011100010111100110010001100000011000000111001
                    </div>
                ))}
            </div>
        </section>
    )
}

function Heartbeat() {
    const [price, setPrice] = useState<number | null>(null)
    const [prevPrice, setPrevPrice] = useState<number | null>(null)
    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
        wsRef.current = ws

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            const currentPrice = parseFloat(data.p)
            setPrice((prev) => {
                setPrevPrice(prev)
                return currentPrice
            })
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) ws.close()
        }
    }, [])

    const isUp = price && prevPrice && price > prevPrice
    const isDown = price && prevPrice && price < prevPrice

    return (
        <section className="py-24 px-4 border-t border-border/10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-foreground">The Heartbeat</h2>
                <div className="relative flex items-center justify-center h-40">
                    {/* Pulse Animation */}
                    <motion.div
                        key={price} // Re-animate on price change
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 0.2 }}
                        className={`absolute w-64 h-64 rounded-full blur-[80px] ${isUp ? 'bg-green-500/20' : isDown ? 'bg-red-500/20' : 'bg-orange-500/10'}`}
                    />

                    {/* Updated background to 'bg-card/80' and colors for better visibility in light mode */}
                    <div className="z-10 bg-card/80 backdrop-blur-md border border-border/10 rounded-2xl px-8 py-6 shadow-2xl">
                        <div className="text-sm text-muted mb-2 font-mono">LIVE / BTCUSD</div>
                        <div className={`text-5xl md:text-7xl font-mono font-bold tracking-tighter transition-colors duration-300 ${isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-foreground'}`}>
                            ${price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '---,---.--'}
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-muted max-w-lg mx-auto">
                    Bitcoin never sleeps. Every second, blocks are propagated, nodes reconcile truth, and value is transferred without permission.
                </p>
            </div>
        </section>
    )
}

function HistoryTimeline() {
    const events = [
        { year: '2008', title: 'The Shadow', desc: 'Domain bitcoin.org registered. Whitepaper published by Satoshi Nakamoto.' },
        { year: '2009', title: 'The Genesis', desc: 'Block #0 mined. The network goes live.' },
        { year: '2010', title: 'Real Value', desc: 'Laszlo Hanyecz pays 10,000 BTC for two pizzas. The first real-world transaction.' },
        { year: '2017', title: 'The Civil War', desc: 'SegWit activation. Bitcoin proves it cannot be co-opted by corporations.' },
        { year: '2021', title: 'El Zonte', desc: 'El Salvador adopts Bitcoin as legal tender. A sovereign nation opts out of fiat.' },
        { year: '2024', title: 'Acceptance', desc: 'Spot ETFs approved. Wall Street finally bends the knee.' },
    ]

    return (
        <section className="py-24 px-4 bg-muted/5">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold mb-16 text-center text-foreground">Path to Freedom</h2>
                <div className="relative border-l border-border/20 ml-4 md:ml-12 space-y-12">
                    {events.map((event, i) => (
                        <div key={i} className="relative pl-8 md:pl-12 group">
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-muted group-hover:bg-[#F7931A] transition-colors duration-300 ring-4 ring-background" />
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                                <span className="font-mono text-[#F7931A] text-xl font-bold">{event.year}</span>
                                <div>
                                    <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-[#F7931A] transition-colors">{event.title}</h3>
                                    <p className="text-muted leading-relaxed text-sm md:text-base">{event.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Scarcity() {
    const supply = 19700000 // Approximate current supply
    const maxSupply = 21000000
    const percentage = (supply / maxSupply) * 100

    return (
        <section className="py-24 px-4 border-t border-border/10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">21 Million. No More.</h2>
                <p className="text-muted max-w-2xl mx-auto mb-12 text-lg">
                    Absolute scarcity in a digital world. There will never be more than 21 million BTC.
                </p>

                <div className="relative h-12 w-full bg-muted/10 rounded-full overflow-hidden border border-border/10">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-[#F7931A] flex items-center justify-end px-4"
                    >
                        <span className="text-xs font-bold text-white font-mono tracking-wider">
                            {percentage.toFixed(2)}% MINED
                        </span>
                    </motion.div>
                </div>

                <div className="flex justify-between mt-4 text-xs font-mono text-muted uppercase tracking-widest">
                    <span>0 BTC</span>
                    <span>Current: ~19.7M</span>
                    <span>∞ / 21M</span>
                </div>
            </div>
        </section>
    )
}

export default function BitcoinPage() {
    return (
        <main className="min-h-screen pt-20 pb-20 bg-background text-foreground transition-colors duration-300">
            <GenesisBlock />
            <Heartbeat />
            <HistoryTimeline />
            <Scarcity />

            <section className="text-center py-24">
                <a
                    href="https://bitcoin.org/bitcoin.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-b border-[#F7931A] text-[#F7931A] hover:opacity-80 transition-opacity pb-1"
                >
                    Read the Whitepaper <ArrowUpRight className="w-4 h-4" />
                </a>
            </section>
        </main>
    )
}
