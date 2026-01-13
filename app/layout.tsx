import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Lora } from 'next/font/google'
import { Fira_Code } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { personStructuredData, websiteStructuredData } from '@/lib/structured-data'

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
    default: 'Dany Akmallun Ni\'am - Crypto enthusiast • Web Developer • Lifelong learner',
    template: '%s | Dany Akmallun'
  },
  description: 'Portfolio pribadi Dany Akmallun Ni\'am, seorang Crypto enthusiast • Web Developer • Lifelong learner yang berdedikasi untuk membangun masa depan terdesentralisasi.',
  keywords: ['crypto', 'web3', 'blockchain', 'web developer', 'prompt engineer', 'indonesia', 'dany akmallun'],
  authors: [{ name: 'Dany Akmallun Ni\'am' }],
  creator: 'Dany Akmallun Ni\'am',
  publisher: 'Dany Akmallun Ni\'am',
  category: 'Technology',
  classification: 'Portfolio Website',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Dany Akmallun',
    'application-name': 'Dany Akmallun Portfolio',
    'msapplication-TileColor': '#09090b',
    'theme-color': '#09090b',
  },
  openGraph: {
    title: 'Dany Akmallun Ni\'am - Crypto enthusiast • Web Developer • Lifelong learner',
    description: 'Portfolio pribadi Dany Akmallun Ni\'am, seorang Crypto enthusiast • Web Developer • Lifelong learner yang berdedikasi untuk membangun masa depan terdesentralisasi.',
    url: 'https://danyakmallun.com/',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Dany Akmallun Ni\'am',
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
    title: 'Dany Akmallun Ni\'am - Crypto enthusiast • Web Developer • Lifelong learner',
    description: 'Portfolio pribadi Dany Akmallun Ni\'am, seorang Crypto enthusiast • Web Developer • Lifelong learner yang berdedikasi untuk membangun masa depan terdesentralisasi.',
    images: [
      {
        url: '/opengraph.jpg',
        width: 1366,
        height: 768,
        alt: 'Dany Akmallun Ni\'am - Profile Picture',
      },
    ],
    creator: '@danyakmallun',
    site: '@danyakmallun',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ABC123DEF456GHI789', // Ganti dengan kode verifikasi Google Anda yang sebenarnya
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
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

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${firaCode.variable} ${lora.variable} bg-background text-foreground tracking-tight antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <Header />
            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 sm:px-8 lg:px-12">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Analytics />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}