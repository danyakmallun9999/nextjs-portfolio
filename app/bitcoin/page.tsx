'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Bitcoin, ArrowLeft, ArrowRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// --- Components ---

function GenesisBlock() {
    const [binaryLines, setBinaryLines] = useState<string[]>([])

    useEffect(() => {
        const lines = Array.from({ length: 40 }).map(() => {
            return (Math.random() > 0.5 ? '1' : '0') + (Math.random() > 0.5 ? '1' : '0') + '010101000110100001100101001000000101010001101001011011010110010101110011001000000011000000110011001011110100101001100001011011100010111100110010001100000011000000111001'
        })
        setBinaryLines(lines)
    }, [])

    return (
        <section className="pt-10 pb-20 md:pt-16 md:pb-32 flex flex-col items-center text-center px-4 relative overflow-hidden">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
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
                {binaryLines.map((line, i) => (
                    <div key={i} className="whitespace-nowrap">
                        {line}
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
                <h2 className="text-sm font-mono text-muted mb-8 uppercase tracking-widest relative z-10">The Heartbeat</h2>
                <div className="relative flex items-center justify-center h-64 md:h-80">
                    {/* Background Bitcoin Watermark Logo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                        className="absolute opacity-5 dark:opacity-10 pointer-events-none select-none grayscale"
                    >
                        <img
                            src="/bitcoin.png"
                            alt="Bitcoin Logo"
                            className="w-64 h-64 md:w-[500px] md:h-[500px] object-contain"
                        />
                    </motion.div>

                    {/* Pulse Animation - Made much more subtle */}
                    <motion.div
                        key={price}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 0.8 }}
                        className={`absolute w-96 h-96 rounded-full blur-[100px] z-0 ${isUp ? 'bg-green-500/20' : isDown ? 'bg-red-500/20' : 'bg-transparent'}`}
                    />

                    <div className="z-10 bg-transparent flex flex-col items-center">
                        <div className={`text-6xl md:text-8xl font-mono font-bold tracking-tighter transition-colors duration-500 relative z-10 ${isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-foreground'}`}>
                            ${price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '---,---.--'}
                        </div>
                        <div className="mt-4 text-xs text-muted/50 font-mono flex items-center justify-center gap-2 relative z-10">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> LIVE PRICE CONNECTION
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-muted/60 max-w-lg mx-auto text-sm leading-relaxed relative z-10">
                    Bitcoin never sleeps. It breathes, block by block.
                </p>
            </div>
        </section>
    )
}

function PriceChart() {
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchHistory() {
            try {
                // Fetch max monthly data (limit 1000 covers ~80 years, effectively all available history)
                // Binance started ~2017, but sometimes provides earlier data if backfilled, usually just 2017+
                const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&limit=1000')
                const data = await res.json()

                const formattedData = data.map((item: any) => {
                    const date = new Date(item[0])
                    return {
                        year: date.getFullYear().toString(),
                        price: parseFloat(item[4]), // Close price
                        fullDate: date.toLocaleDateString()
                    }
                })

                setChartData(formattedData)
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch price history", error)
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    if (loading) return null

    return (
        <section className="py-24 px-4 border-t border-border/10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">Bitcoin Price History</h2>
                <div className="h-[300px] md:h-[500px] w-full pointer-events-none select-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="year"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                minTickGap={50}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            {/* Tooltip removed to disable hover interaction */}
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#F7931A"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                                activeDot={false}
                                isAnimationActive={true}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-muted text-sm mt-8">
                    Data fetched continuously from Binance API (All Time Monthly).
                </p>
            </div>
        </section>
    )
}

function HistoryTimeline() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 420 // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const events = [
        { year: '2008', title: 'The Shadow', desc: 'Domain bitcoin.org registered. Whitepaper published by Satoshi Nakamoto.' },
        { year: '2009', title: 'The Genesis', desc: 'Block #0 mined. The network goes live.' },
        { year: '2010', title: 'Real Value', desc: 'Laszlo Hanyecz pays 10,000 BTC for two pizzas. The first real-world transaction.' },
        { year: '2017', title: 'The Civil War', desc: 'SegWit activation. Bitcoin proves it cannot be co-opted by corporations.' },
        { year: '2021', title: 'El Zonte', desc: 'El Salvador adopts Bitcoin as legal tender. A sovereign nation opts out of fiat.' },
        { year: '2024', title: 'Acceptance', desc: 'Spot ETFs approved. Wall Street finally bends the knee.' },
    ]

    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-2">Timeline</h2>
                        <div className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">Path to Freedom</div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="text-muted text-sm hidden md:block mr-4">Scroll to explore</div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-3 rounded-full border border-border/10 bg-muted/5 hover:bg-muted/10 hover:border-[#F7931A]/50 transition-all active:scale-95"
                                aria-label="Scroll left"
                            >
                                <ArrowLeft className="w-5 h-5 text-foreground" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-3 rounded-full border border-border/10 bg-muted/5 hover:bg-muted/10 hover:border-[#F7931A]/50 transition-all active:scale-95"
                                aria-label="Scroll right"
                            >
                                <ArrowRight className="w-5 h-5 text-foreground" />
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {events.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-muted/5 border border-border/10 p-8 rounded-2xl hover:border-[#F7931A]/30 transition-colors duration-300 group flex flex-col"
                        >
                            <span className="font-mono text-4xl md:text-5xl font-bold text-[#F7931A] mb-auto block">
                                {event.year}
                            </span>
                            <div className="mt-8 md:mt-16">
                                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground group-hover:text-[#F7931A] transition-colors duration-300">
                                    {event.title}
                                </h3>
                                <p className="text-muted text-sm md:text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                                    {event.desc}
                                </p>
                            </div>
                        </motion.div>
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

function HalvingCountdown() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        // Target: Approx April 14, 2028 (Estimated)
        const targetDate = new Date('2028-04-14T00:00:00').getTime()

        const updateCountdown = () => {
            const now = new Date().getTime()
            const distance = targetDate - now

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            })
        }

        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)

        return () => clearInterval(interval)
    }, [])

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center bg-muted/5 border border-border/10 p-6 rounded-2xl min-w-[100px] md:min-w-[140px]">
            <span className="text-4xl md:text-6xl font-mono font-bold text-[#F7931A] mb-2">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted uppercase tracking-widest">{label}</span>
        </div>
    )

    return (
        <section className="py-24 px-4 bg-muted/5">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-foreground">Next Halving</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Mins" />
                    <TimeUnit value={timeLeft.seconds} label="Secs" />
                </div>

                <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                    Every 210,000 blocks (approx. 4 years), the Bitcoin issuance rate is cut in half.
                    <br className="hidden md:block" />
                    In 2028, the block reward will drop from <span className="text-foreground font-semibold">3.125 BTC</span> to <span className="text-foreground font-semibold">1.5625 BTC</span>.
                </p>
                <div className="mt-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7931A]/10 text-[#F7931A] text-xs font-mono font-bold border border-[#F7931A]/20">
                        ESTIMATED DATE: APR 2028
                    </span>
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
            <PriceChart />
            <HistoryTimeline />
            <Scarcity />
            <HalvingCountdown />

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
