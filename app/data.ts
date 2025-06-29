type Project = {
  name: string
  description: string
  link: string
  image: string
  id: string
  techStack: string[]
  category: string
  featured?: boolean
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  description: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'AnyConverter',
    description:
      'Aplikasi konversi file yang memudahkan pengguna untuk mengonversi berbagai format file dengan cepat dan mudah.',
    link: 'https://github.com/danyakmallun9999/AnyConverter',
    image: '/projek/anyconverter.png',
    id: 'project1',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
    category: 'Web Application',
    featured: true,
  },
  {
    name: 'Portfolio dengan sistem blog',
    description: 'Portfolio dengan sistem blog yang memudahkan pengguna untuk mengelola konten blog mereka.',
    link: 'https://github.com/danyakmallun9999/portfolio-blog',
    image: '/projek/portfolio-blog.png',
    id: 'project2',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'],
    category: 'Portfolio',
    featured: true,
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Klinik Pratama Amalia',
    title: 'IT Support',
    start: '2022',
    end: '2023',
    link: 'https://ibelick.com',
    id: 'work1',
    description: 'Mengelola dan memelihara infrastruktur teknologi informasi klinik, termasuk sistem komputer, jaringan, dan perangkat lunak. Memberikan dukungan teknis kepada seluruh staf, melakukan troubleshooting hardware dan software, serta memastikan kelancaran operasional sistem IT untuk mendukung pelayanan kesehatan yang optimal.',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Apa itu Web3 ?',
    description: 'Web3, Lebih dari Sekadar Internet Biasa',
    link: '/blog/apa-itu-web3',
    uid: 'blog-1',
  },
  {
    title: 'Peran vital Testnet dalam ekosistem kripto',
    description: 'Testnet adalah replika jaringan blockchain yang berfungsi sebagai laboratorium aman bagi developer untuk menguji aplikasi dan smart contract tanpa risiko finansial. Pelajari perbedaannya dengan mainnet dan mengapa ini krusial.',
    link: '/blog/peran-vital-testnet-dalam-ekosistem-kripto',
    uid: 'blog-2',
  },
  {
    title: 'Madilog: Materialisme, Dialektika, & Logika Tan Malaka',
    description: 'Madilog, gagasan Tan Malaka, adalah kerangka berpikir ilmiah yang menggabungkan Materialisme, Dialektika, dan Logika untuk membebaskan bangsa dari pemikiran irasional. Pelajari tiga konsep dasarnya.',
    link: '/blog/materialisme-dialektika-dan-logika',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/danyakmallun9999',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/danyakmallun',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/dany-akmallun-ni-am-786580230/',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/danyakmallun_',
  },
]

export const EMAIL = 'danyclasher9999@gmail.com'
