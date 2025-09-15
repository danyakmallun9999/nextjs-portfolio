import { WEBSITE_URL } from '@/lib/constants'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dany Akmallun Ni'am",
  "jobTitle": "Web Developer",
  "description": "Crypto enthusiast • Web Developer • Lifelong learner yang berdedikasi untuk membangun masa depan terdesentralisasi",
  "url": WEBSITE_URL,
  "sameAs": [
    "https://github.com/danyakmallun9999",
    "https://twitter.com/danyakmallun",
    "https://linkedin.com/in/danyakmallun",
    "https://instagram.com/danyakmallun"
  ],
  "knowsAbout": [
    "Web Development",
    "Crypto",
    "Blockchain", 
    "Web3",
    "Laravel",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Prompt Engineering"
  ],
  "alumniOf": "Universitas",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  }
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dany Akmallun Ni'am",
  "url": WEBSITE_URL,
  "description": "Portfolio pribadi Dany Akmallun Ni'am, seorang Crypto enthusiast • Web Developer • Lifelong learner",
  "author": {
    "@type": "Person",
    "name": "Dany Akmallun Ni'am"
  },
  "inLanguage": "id-ID",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${WEBSITE_URL}/blog?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

export const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Dany Akmallun",
  "url": `${WEBSITE_URL}/blog`,
  "description": "Thoughts, insights, and discoveries about technology, crypto, web3, and beyond",
  "author": {
    "@type": "Person",
    "name": "Dany Akmallun Ni'am"
  },
  "publisher": {
    "@type": "Person",
    "name": "Dany Akmallun Ni'am"
  },
  "inLanguage": "id-ID"
}

export function generateArticleStructuredData(post: {
  title: string
  description: string
  slug: string
  publishedAt: string
  coverImage?: string
  tags?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "url": `${WEBSITE_URL}/blog/${post.slug}`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": "Dany Akmallun Ni'am"
    },
    "publisher": {
      "@type": "Person",
      "name": "Dany Akmallun Ni'am"
    },
    "image": post.coverImage ? `${WEBSITE_URL}${post.coverImage}` : `${WEBSITE_URL}/opengraph.jpg`,
    "keywords": post.tags?.join(', ') || '',
    "inLanguage": "id-ID",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${WEBSITE_URL}/blog/${post.slug}`
    }
  }
}

// Structured data untuk breadcrumbs
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${WEBSITE_URL}${item.href}` : undefined
    }))
  }
}
