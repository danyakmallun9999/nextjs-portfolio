import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Posts - Dany Akmallun Ni\'am',
  description: 'Thoughts, insights, and discoveries about technology, crypto, web3, and beyond. Explore articles about blockchain, development, and digital innovation.',
  keywords: 'blog, technology, crypto, web3, blockchain, development, programming, indonesia, dany akmallun',
  authors: [{ name: 'Dany Akmallun Ni\'am' }],
  creator: 'Dany Akmallun Ni\'am',
  publisher: 'Dany Akmallun Ni\'am',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://danyakmallun.com'),
  alternates: {
    canonical: 'https://danyakmallun.com/blog',
  },
  openGraph: {
    title: 'Blog Posts - Dany Akmallun Ni\'am',
    description: 'Thoughts, insights, and discoveries about technology, crypto, web3, and beyond.',
    url: 'https://danyakmallun.com/blog',
    siteName: 'Dany Akmallun Ni\'am',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://danyakmallun.com/opengraph.jpg',
        width: 1366,
        height: 768,
        alt: 'Dany Akmallun Ni\'am - Profile Picture',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Posts - Dany Akmallun Ni\'am',
    description: 'Thoughts, insights, and discoveries about technology, crypto, web3, and beyond.',
    images: 'https://danyakmallun.com/opengraph.jpg',
    creator: '@danyakmallun',
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
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
