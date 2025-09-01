<img src="/public/cover.jpg" alt="Cover image representing Nim, a personal website template" width="100%" />

Nim is a free and open-source personal website template built with Next.js 15, React 19, Tailwind CSS v4, and Motion. Designed for developers, designers, and founders, it combines minimalism with delightful animated components powered by [Motion-Primitives](https://motion-primitives.com).

Live demo: [https://nim-fawn.vercel.app](https://nim-fawn.vercel.app)

## Features

- Minimal one-page portfolio layout.
- Blog support with MDX.
- Responsive and accessible design.
- Easy to use
- [Motion-Primitives](https://motion-primitives.com) for animated components.

## Getting Started

For detailed setup instructions, refer to the [Installation Guide](./INSTALLATION.md).

```bash
git clone https://github.com/ibelick/nim.git
cd nim
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve Nim.

## Deployment

You can deploy your site to any hosting platform that supports Next.js. For the easiest deployment experience, consider using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fibelick%2Fnim&env=NEXT_PUBLIC_SITE_URL&project-name=nim&repository-name=nim&redirect-url=https%3A%2F%2Ftwitter.com%2Fibelick&demo-title=Nim&demo-description=Nim%20is%20a%20free%20and%20open-source%20minimal%20personal%20website%20template%20built%20with%20Next.js%2015%2C%20React%2019%2C%20and%20Motion-Primitives.&demo-url=https%3A%2F%2Fnim.vercel.app&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fibelick%2Fnim%2Frefs%2Fheads%2Fmain%2F.github%2Fassets%2Freadme.png&teamSlug=ibelick)

## About

Nim is designed to make personal branding effortless and beautiful. If you enjoy it, consider sharing it and exploring [Motion-Primitives Pro](https://pro.motion-primitives.com/).

# Sistem Blog Fleksibel - Next.js Portfolio

Sistem blog yang telah di-upgrade untuk memberikan fleksibilitas maksimal dalam pembuatan konten blog tanpa perlu coding manual.

## 🚀 Fitur Baru

### ✅ File-based CMS dengan Auto-discovery
- Blog post otomatis terdeteksi dari folder `content/blog/`
- Tidak perlu menambah data manual di `data.ts`
- Support Markdown lengkap dengan frontmatter
- Metadata terstruktur (title, description, date, tags, dll)

### ✅ Script Pembuatan Blog Post
- Command line tool untuk membuat blog post baru
- Template otomatis dengan frontmatter
- Validasi input dan error handling

### ✅ API Routes
- Endpoint `/api/blog-posts` untuk mengambil data blog
- Support untuk pagination dan filtering
- Error handling yang robust

## 📝 Cara Menggunakan

### Membuat Blog Post Baru

#### Metode 1: Menggunakan Script (Recommended)
```bash
npm run create-post
```

Script akan meminta input:
- Judul blog post
- Deskripsi singkat
- Slug (URL-friendly)
- Tags
- Cover image (opsional)

#### Metode 2: Manual
1. Buat file `.mdx` baru di folder `content/blog/`
2. Tambahkan frontmatter di bagian atas:

```mdx
---
title: "Judul Blog Post"
description: "Deskripsi singkat blog post"
publishedAt: "2025-01-15"
coverImage: "/posts/cover-image.jpg"
tags: ["teknologi", "web3", "blockchain"]
---

# Judul Blog Post

Konten blog Anda di sini...
```

## 📁 Struktur File

```
content/
└── blog/
    ├── cara-membuat-blog-fleksibel-dengan-nextjs.mdx
    ├── paradoks-bangsa-digital-yang-percaya-dukun.mdx
    └── contoh-blog-post-baru.mdx
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Create new blog post
npm run create-post

# Build for production
npm run build
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push perubahan ke GitHub
2. Vercel akan otomatis rebuild dan deploy
3. Blog post baru akan langsung tersedia

## 📊 Perbandingan Sistem

### Sebelum (Manual)
- ❌ Harus buat file MDX manual
- ❌ Harus update `data.ts` manual
- ❌ Harus push ke GitHub untuk update
- ❌ Tidak ada validasi metadata
- ❌ Sulit untuk non-developer

### Sesudah (Otomatis)
- ✅ Auto-discovery file MDX
- ✅ Tidak perlu update data manual
- ✅ Script helper untuk pembuatan
- ✅ Validasi metadata otomatis
- ✅ User-friendly untuk non-developer
- ✅ Support untuk tags dan filtering
- ✅ SEO-friendly URLs

## 🎯 Tips Penggunaan

1. **Nama File**: Gunakan format kebab-case dan SEO-friendly
   - ✅ `cara-membuat-blog-dengan-nextjs.mdx`
   - ❌ `blog post 1.mdx`

2. **Tags**: Gunakan tags yang konsisten untuk grouping
   - `teknologi`, `web3`, `blockchain`, `tutorial`, `tips`

3. **Cover Image**: Simpan di folder `public/posts/` untuk konsistensi

4. **Content**: Gunakan Markdown untuk formatting yang kaya

## 🔍 Troubleshooting

### Blog post tidak muncul
1. Pastikan file ada di `content/blog/`
2. Pastikan ekstensi file `.mdx`
3. Pastikan frontmatter valid
4. Restart development server

### Error saat build
1. Check syntax frontmatter
2. Pastikan semua field required ada
3. Check console untuk error detail

## 📚 Dokumentasi Lengkap

Lihat [BLOG_SYSTEM.md](./BLOG_SYSTEM.md) untuk dokumentasi lengkap sistem blog.

## 🤝 Support

Jika ada masalah atau pertanyaan, buat issue di GitHub repository.
