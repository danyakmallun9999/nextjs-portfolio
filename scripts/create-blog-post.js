#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createBlogPost() {
  console.log('🎉 Selamat datang di Blog Post Creator!\n');

  try {
    // Input dari user
    const title = await question('Judul blog post: ');
    const description = await question('Deskripsi singkat: ');
    const slug = await question('Slug (URL-friendly, contoh: cara-membuat-blog): ');
    const tags = await question('Tags (pisahkan dengan koma): ');
    const coverImage = await question('Cover image path (opsional, contoh: /posts/cover.jpg): ');

    // Generate tanggal hari ini
    const today = new Date().toISOString().split('T')[0];

    // Template frontmatter
    const frontmatter = `---
title: "${title}"
description: "${description}"
publishedAt: "${today}"
${coverImage ? `coverImage: "${coverImage}"` : ''}
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
---

# ${title}

Tulis konten blog Anda di sini...

## Pendahuluan

Mulai dengan pendahuluan yang menarik...

## Konten Utama

Tulis konten utama Anda di sini...

## Kesimpulan

Akhiri dengan kesimpulan yang kuat...

---

*Ditulis pada ${new Date().toLocaleDateString('id-ID', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}*
`;

    // Buat direktori jika belum ada
    const postsDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    // Buat file
    const filePath = path.join(postsDir, `${slug}.mdx`);
    fs.writeFileSync(filePath, frontmatter);

    console.log('\n✅ Blog post berhasil dibuat!');
    console.log(`📁 File: ${filePath}`);
    console.log('\n📝 Langkah selanjutnya:');
    console.log('1. Edit file yang baru dibuat');
    console.log('2. Tulis konten blog Anda');
    console.log('3. Commit dan push ke GitHub');
    console.log('4. Blog akan otomatis ter-update di Vercel');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    rl.close();
  }
}

createBlogPost();
