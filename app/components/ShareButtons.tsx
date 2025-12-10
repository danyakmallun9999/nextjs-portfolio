'use client'

import { useState } from 'react'
import { FaXTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa6'
import { Link, Check } from 'lucide-react'

interface ShareButtonsProps {
    url: string
    title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const shareLinks = [
        {
            name: 'Twitter',
            icon: FaXTwitter,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'hover:border-white hover:text-white', // Minimalist white hover
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'hover:border-white hover:text-white',
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            href: `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
            color: 'hover:border-white hover:text-white',
        },
    ]

    return (
        <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <p className="text-sm font-medium text-[#888888]">
                    Bagikan artikel ini
                </p>

                <div className="flex items-center gap-4">
                    {shareLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Share on ${link.name}`}
                            className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#333] bg-transparent text-[#888888] transition-all duration-300 hover:scale-110 ${link.color}`}
                        >
                            <link.icon className="h-4 w-4 transition-transform duration-300" />
                        </a>
                    ))}

                    <button
                        onClick={handleCopy}
                        aria-label="Copy Link"
                        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#333] bg-transparent text-[#888888] transition-all duration-300 hover:scale-110 hover:border-white hover:text-white"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                            <Link className="h-4 w-4 transition-transform duration-300" />
                        )}

                        {/* Tooltip for Copy Feedback */}
                        {copied && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs font-medium text-black opacity-100 transition-opacity">
                                Link tersalin!
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
