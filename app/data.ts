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
    {
    name: 'Venture Capital Website',
    description: 'Elegant venture capital website specializing in cryptocurrency and blockchain investments.',
    link: 'https://capital.danyakmallun.com',
    image: '/projek/capital-website.png',
    id: 'project3',
    techStack: ['NextJS 15', 'React 19', 'NodeJS', 'Tailwind CSS','TypeScript','Framer Motion','Three.js'],
    category: 'Web Application',
    featured: true,
  },
    {
    name: 'Manufacturing Management System',
    description: 'A comprehensive manufacturing management system built with Laravel 12, designed to streamline order management, production tracking, inventory control, and financial reporting for manufacturing businesses.',
    link: 'https://manufaktur.idefu.co.id/',
    image: '/projek/manufaktur.png',
    id: 'project4',
    techStack: ['Laravel 12', 'Blade', 'NodeJS', 'Tailwind CSS',],
    category: 'Web Application',
    featured: true,
  },
      {
    name: 'Course Schedule App',
    description: 'Aplikasi web jadwal kuliah dengan desain modern dan minimalis yang terinspirasi dari Apple Reminders.',
    link: 'https://jadwal.danyakmallun.com',
    image: '/projek/jadwal.png',
    id: 'project3',
    techStack: ['NextJS 15', 'React 19', 'NodeJS', 'Tailwind CSS','TypeScript'],
    category: 'Web Application',
    featured: true,
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Klinik Pratama Amalia',
    title: 'IT Support',
    start: '2022',
    end: '2023',
    link: 'https://share.google/oQu6fhXU0meamcNkH',
    id: 'work1',
    description: 'Mengelola dan memelihara infrastruktur teknologi informasi klinik, termasuk sistem komputer, jaringan, dan perangkat lunak. Memberikan dukungan teknis kepada seluruh staf, melakukan troubleshooting hardware dan software, serta memastikan kelancaran operasional sistem IT untuk mendukung pelayanan kesehatan yang optimal.',
  },
    {
    company: 'Pengabdian Dosen Universitas Nahdlatul Ulama Jepara',
    title: 'Anggota Pengabdian Dosen',
    start: '2025',
    end: '2025',
    link: 'https://radarkudus.jawapos.com/jepara/696474276/industri-furnitur-jepara-naik-kelas-lewat-teknologi-steam-berbasis-internet-of-things',
    id: 'work2',
    description: 'Saya berkontribusi dalam program pengabdian dosen di bidang informatika dengan fokus pada pengembangan teknologi berbasis Internet of Things (IoT) untuk industri furnitur di Jepara. Peran saya mencakup pengembangan dan pembuatan sistem manufaktur mebel yang mendukung manajemen pesanan, pelacakan produksi, pengendalian inventori, hingga pelaporan keuangan. Selain itu, saya juga memberikan pelatihan kepada pelaku industri terkait pengelolaan keuangan, penggunaan aplikasi invoice, serta pemanfaatan teknologi untuk meningkatkan efisiensi dan daya saing bisnis.',
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
    link: 'https://www.linkedin.com/in/danyakmallun/',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/danyakmallun_',
  },
]

export const EMAIL = 'danyclasher9999@gmail.com'
