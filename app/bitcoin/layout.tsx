
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bitcoin - The Genesis | danyakmallun',
    description: '"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks." — Satoshi Nakamoto\'s hidden message in Block #0. A reminder of why we build.',
    openGraph: {
        title: 'Bitcoin - The Genesis | danyakmallun',
        description: '"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks." — Satoshi Nakamoto\'s hidden message in Block #0. A reminder of why we build.',
        url: 'https://danyakmallun.com/bitcoin',
        images: [
            {
                url: '/bitcoin-og.png',
                width: 1200, // Typical OG image width
                height: 630, // Typical OG image height
                alt: 'Bitcoin - The Genesis Block',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bitcoin - The Genesis | danyakmallun',
        description: '"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks." — Satoshi Nakamoto\'s hidden message in Block #0. A reminder of why we build.',
        images: ['/bitcoin-og.png'],
    },
}

export default function BitcoinLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
