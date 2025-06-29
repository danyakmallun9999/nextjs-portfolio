import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://danyakmallun.com/'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Dany Akmallun Ni\'am - Crypto Enthusiast & Web3 Developer',
    template: '%s | Dany Akmallun'
  },
  description: 'Portfolio pribadi Dany Akmallun Ni\'am - Penggemar Crypto, Web Developer, dan Prompt Engineer yang berdedikasi untuk membangun masa depan terdesentralisasi.',
  keywords: ['crypto', 'web3', 'blockchain', 'web developer', 'prompt engineer', 'indonesia', 'dany akmallun'],
  authors: [{ name: 'Dany Akmallun Ni\'am' }],
  creator: 'Dany Akmallun Ni\'am',
  openGraph: {
    title: 'Dany Akmallun Ni\'am - Crypto Enthusiast & Web3 Developer',
    description: 'Portfolio pribadi Dany Akmallun Ni\'am - Penggemar Crypto, Web Developer, dan Prompt Engineer yang berdedikasi untuk membangun masa depan terdesentralisasi.',
    url: 'https://danyakmallun.com/',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/opengraph.jpg',
        width: 1366,
        height: 768,
        alt: 'Dany Akmallun Ni\'am - Profile Picture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dany Akmallun Ni\'am - Crypto Enthusiast & Web3 Developer',
    description: 'Portfolio pribadi Dany Akmallun Ni\'am - Penggemar Crypto, Web Developer, dan Prompt Engineer.',
    images: [
      {
        url: '/opengraph.jpg',
        width: 1366,
        height: 768,
        alt: 'Dany Akmallun Ni\'am - Profile Picture',
      },
    ],
  },
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}