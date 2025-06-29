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
  date: string // ISO string
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
    techStack: ['Python', 'Laravel 12', 'Tailwind CSS', 'NodeJS', 'NPM', 'Blade'],
    category: 'Web Application',
    featured: true,
  },
  {
    name: 'Portfolio dengan sistem blog',
    description: 'Portfolio dengan sistem blog yang memudahkan pengguna untuk mengelola konten blog mereka.',
    link: 'https://github.com/danyakmallun9999/portfolio-blog',
    image: '/projek/portfolio-blog.png',
    id: 'project2',
    techStack: ['Laravel 12', 'Blade', 'NodeJS', 'Tailwind CSS',],
    category: 'Portfolio',
    featured: true,
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  // {
  //   company: 'Freelance Web Developer',
  //   title: 'Junior Web Developer',
  //   start: '2020',
  //   end: '2021',
  //   link: '#',
  //   id: 'work1',
  //   description: 'Memulai karir sebagai freelance web developer, mengerjakan proyek-proyek kecil untuk klien lokal. Fokus pada pengembangan website sederhana menggunakan HTML, CSS, dan JavaScript. Belajar dasar-dasar web development dan memahami kebutuhan klien.',
  // },
  // {
  //   company: 'Digital Agency XYZ',
  //   title: 'Frontend Developer',
  //   start: '2021',
  //   end: '2022',
  //   link: '#',
  //   id: 'work2',
  //   description: 'Bergabung dengan digital agency sebagai frontend developer. Mengembangkan website responsif menggunakan React.js dan Tailwind CSS. Bekerja dalam tim untuk proyek-proyek e-commerce dan landing page. Meningkatkan skill dalam modern web development.',
  // },
  {
    company: 'Klinik Pratama Amalia',
    title: 'IT Support',
    start: '2022',
    end: '2023',
    link: 'https://ibelick.com',
    id: 'work3',
    description: 'Mengelola dan memelihara infrastruktur teknologi informasi klinik, termasuk sistem komputer, jaringan, dan perangkat lunak. Memberikan dukungan teknis kepada seluruh staf, melakukan troubleshooting hardware dan software, serta memastikan kelancaran operasional sistem IT untuk mendukung pelayanan kesehatan yang optimal.',
  },
  // {
  //   company: 'Tech Startup ABC',
  //   title: 'Full Stack Developer',
  //   start: '2023',
  //   end: '2024',
  //   link: '#',
  //   id: 'work4',
  //   description: 'Bergabung dengan startup teknologi sebagai full stack developer. Mengembangkan aplikasi web menggunakan Laravel, Vue.js, dan MySQL. Bertanggung jawab atas pengembangan fitur-fitur baru, maintenance sistem, dan optimasi performa. Belajar tentang scalable architecture dan best practices.',
  // },
  // {
  //   company: 'Blockchain Company DEF',
  //   title: 'Web3 Developer',
  //   start: '2024',
  //   end: 'Present',
  //   link: '#',
  //   id: 'work5',
  //   description: 'Beralih ke pengembangan Web3 dan blockchain. Mengembangkan smart contracts menggunakan Solidity, dApps menggunakan React dan Web3.js. Fokus pada DeFi protocols dan NFT marketplace. Aktif berpartisipasi dalam berbagai testnet dan hackathon untuk meningkatkan skill di ekosistem blockchain.',
  // },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Apa itu Web3 ?',
    description: 'Web3, Lebih dari Sekadar Internet Biasa',
    link: '/blog/apa-itu-web3',
    uid: 'blog-1',
    date: '2023-04-01',
  },
  {
    title: 'Peran vital Testnet dalam ekosistem kripto',
    description: 'Testnet adalah replika jaringan blockchain yang berfungsi sebagai laboratorium aman bagi developer untuk menguji aplikasi dan smart contract tanpa risiko finansial. Pelajari perbedaannya dengan mainnet dan mengapa ini krusial.',
    link: '/blog/peran-vital-testnet-dalam-ekosistem-kripto',
    uid: 'blog-2',
    date: '2023-04-02',
  },
  {
    title: 'Madilog: Materialisme, Dialektika, & Logika Tan Malaka',
    description: 'Madilog, gagasan Tan Malaka, adalah kerangka berpikir ilmiah yang menggabungkan Materialisme, Dialektika, dan Logika untuk membebaskan bangsa dari pemikiran irasional. Pelajari tiga konsep dasarnya.',
    link: '/blog/materialisme-dialektika-dan-logika',
    uid: 'blog-3',
    date: '2023-04-03',
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
