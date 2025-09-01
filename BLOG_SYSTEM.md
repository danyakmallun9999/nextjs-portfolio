# Sistem Blog yang Fleksibel

## Overview

Sistem blog ini telah di-upgrade untuk memberikan fleksibilitas maksimal dalam pembuatan konten blog tanpa perlu coding manual.

## Fitur Baru

### 1. File-based CMS dengan Auto-discovery
- ✅ Blog post otomatis terdeteksi dari folder `content/blog/`
- ✅ Tidak perlu menambah data manual di `data.ts`
- ✅ Support Markdown lengkap dengan frontmatter
- ✅ Metadata terstruktur (title, description, date, tags, dll)

### 2. Script Pembuatan Blog Post
- ✅ Command line tool untuk membuat blog post baru
- ✅ Template otomatis dengan frontmatter
- ✅ Validasi input dan error handling

### 3. API Routes
- ✅ Endpoint `/api/blog-posts` untuk mengambil data blog
- ✅ Support untuk pagination dan filtering
- ✅ Error handling yang robust

## Cara Menggunakan

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

### Struktur File

```
content/
└── blog/
    ├── contoh-blog-post-baru.mdx
    ├── cara-membuat-blog.mdx
    └── teknologi-terbaru.mdx
```

### Frontmatter Schema

```typescript
interface BlogPost {
  title: string;           // Judul blog post
  description: string;      // Deskripsi singkat
  slug: string;             // Auto-generated dari nama file
  content: string;          // Konten Markdown
  publishedAt: string;      // Tanggal publikasi (YYYY-MM-DD)
  coverImage?: string;      // Path ke cover image (opsional)
  tags?: string[];          // Array of tags (opsional)
}
```

## Deployment

### Vercel (Recommended)
1. Push perubahan ke GitHub
2. Vercel akan otomatis rebuild dan deploy
3. Blog post baru akan langsung tersedia

### Local Development
```bash
npm run dev
```

## Keuntungan Sistem Baru

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

## Tips Penggunaan

1. **Nama File**: Gunakan format kebab-case dan SEO-friendly
   - ✅ `cara-membuat-blog-dengan-nextjs.mdx`
   - ❌ `blog post 1.mdx`

2. **Tags**: Gunakan tags yang konsisten untuk grouping
   - `teknologi`, `web3`, `blockchain`, `tutorial`, `tips`

3. **Cover Image**: Simpan di folder `public/posts/` untuk konsistensi

4. **Content**: Gunakan Markdown untuk formatting yang kaya

## Troubleshooting

### Blog post tidak muncul
1. Pastikan file ada di `content/blog/`
2. Pastikan ekstensi file `.mdx`
3. Pastikan frontmatter valid
4. Restart development server

### Error saat build
1. Check syntax frontmatter
2. Pastikan semua field required ada
3. Check console untuk error detail

## Migrasi dari Sistem Lama

Untuk blog post yang sudah ada:
1. Pindahkan file MDX ke `content/blog/`
2. Tambahkan frontmatter yang sesuai
3. Hapus data dari `data.ts` (opsional)
4. Test di local development

## Support

Jika ada masalah atau pertanyaan, buat issue di GitHub repository.
