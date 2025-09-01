#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Data blog posts lama dari data.ts
const OLD_BLOG_POSTS = [
  {
    title: 'Apa itu Web3 ?',
    description: 'Web3, Lebih dari Sekadar Internet Biasa',
    slug: 'apa-itu-web3',
    date: '2025-06-01',
    coverImage: '/posts/cover-web3.jpg',
    tags: ['web3', 'blockchain', 'teknologi', 'internet']
  },
  {
    title: 'Peran penting Testnet dalam ekosistem kripto',
    description: 'Testnet adalah replika jaringan blockchain yang berfungsi sebagai laboratorium aman bagi developer untuk menguji aplikasi dan smart contract tanpa risiko finansial. Pelajari perbedaannya dengan mainnet dan mengapa ini krusial.',
    slug: 'peran-penting-testnet-dalam-ekosistem-kripto',
    date: '2025-06-22',
    coverImage: '/posts/cover-testnet.png',
    tags: ['testnet', 'blockchain', 'crypto', 'development']
  },
  {
    title: 'Madilog: Materialisme, Dialektika, & Logika Tan Malaka',
    description: 'Madilog, gagasan Tan Malaka, adalah kerangka berpikir ilmiah yang menggabungkan Materialisme, Dialektika, dan Logika untuk membebaskan bangsa dari pemikiran irasional. Pelajari tiga konsep dasarnya.',
    slug: 'materialisme-dialektika-dan-logika',
    date: '2025-06-28',
    coverImage: '/posts/madilog-dasar-pemikiran-ilmiah-tan-malaka.png',
    tags: ['madilog', 'tan malaka', 'filsafat', 'pemikiran']
  },
  {
    title: 'Memahami program Testnet di industri Crypto',
    description: 'Benarkah bisa dapat cuan dari program testnet? Mari kita bedah konsepnya, dari apa itu testnet, mengapa ada imbalan, hingga tantangan yang ada.',
    slug: 'memahami-reward-dari-testnet-di-industri-crypto',
    date: '2025-06-30',
    coverImage: '/posts/cover-testnet.png',
    tags: ['testnet', 'crypto', 'reward', 'blockchain']
  },
  {
    title: 'Monad: Blockchain Layer 1 Berkinerja Tinggi yang Kompatibel dengan EVM',
    description: 'Monad hadir sebagai blockchain Layer 1 yang menjanjikan, dirancang dari nol untuk performa tak tertandingi dan kompatibilitas penuh dengan EVM, siap mendefinisikan ulang standar kinerja blockchain.',
    slug: 'monad-blockchain-layer1-berkinerja-tinggi-yang-kompatibel-dengan-evm',
    date: '2025-07-04',
    coverImage: '/posts/cover-monad.jpg',
    tags: ['monad', 'blockchain', 'evm', 'layer1']
  },
  {
    title: 'Psikologi Uang dalam Dunia Crypto: Panduan dari Morgan Housel',
    description: 'Meski "The Psychology of Money" tidak spesifik membahas crypto, prinsip-prinsip Morgan Housel tentang perilaku finansial sangat relevan. Pelajari cara mengelola emosi dan membuat keputusan bijak di pasar crypto yang volatil.',
    slug: 'psikologi-uang-dalam-dunia-kripto',
    date: '2025-07-13',
    coverImage: '/posts/cover-psychology-money-crypto.jpg',
    tags: ['psikologi', 'uang', 'crypto', 'morgan housel']
  },
  {
    title: 'MegaETH: Blockchain Real-Time yang Mengubah Masa Depan Ethereum',
    description: 'Selami arsitektur, ekosistem, dan visi MegaETH untuk menciptakan World Computer yang membawa performa Web2 ke dalam ekosistem Ethereum yang terdesentralisasi.',
    slug: 'blockchain-real-time-yang-mengubah-masa-depan-ethereum',
    date: '2025-08-17',
    coverImage: '/posts/cover-megaeth-future.webp',
    tags: ['megaeth', 'ethereum', 'blockchain', 'real-time']
  },
  {
    title: 'Tutorial GitHub: Cara Menghubungkan Proyek Lokal ke Repository',
    description: 'Panduan lengkap untuk menghubungkan proyek lokal ke GitHub. Tutorial ini mencakup persiapan, inisialisasi Git, koneksi via HTTPS atau SSH, serta workflow harian untuk developer.',
    slug: 'menghubungkan-proyek-lokal-ke-github',
    date: '2025-08-27',
    coverImage: '/posts/cover-github-connect.png',
    tags: ['github', 'git', 'tutorial', 'development']
  },
  {
    title: 'Konfigurasi Virtual Environment (venv) di Linux',
    description: 'Panduan praktis setup Python virtual environment (venv) di Linux. Lengkap dengan langkah instalasi, aktivasi, alias, dan tips penggunaan.',
    slug: 'konfigurasi-virtual-environment-di-linux',
    date: '2025-08-28',
    coverImage: '/posts/cover-venv-linux.png',
    tags: ['python', 'venv', 'linux', 'development']
  },
  {
    title: 'Cryptocurrency Lebih dari Sekadar Trading',
    description: 'Jangan hanya melihat cryptocurrency dari sisi trading. Artikel ini membahas fondasi kriptografi, desentralisasi, dan inovasi teknologi di baliknya.',
    slug: 'cryptocurrency-lebih-dari-sekadar-trading',
    date: '2025-08-29',
    coverImage: '/posts/cover-crypto-beyond-trading.png',
    tags: ['cryptocurrency', 'blockchain', 'teknologi', 'trading']
  }
];

async function migrateBlogPosts() {
  console.log('🚀 Memulai migrasi blog posts lama ke sistem baru...\n');

  // Buat direktori content/blog jika belum ada
  const postsDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;

  for (const post of OLD_BLOG_POSTS) {
    try {
      // Baca konten dari file MDX lama
      const oldFilePath = path.join(process.cwd(), 'app', 'blog', post.slug, 'page.mdx');
      
      if (!fs.existsSync(oldFilePath)) {
        console.log(`⚠️  File tidak ditemukan: ${oldFilePath}`);
        errorCount++;
        continue;
      }

      const oldContent = fs.readFileSync(oldFilePath, 'utf8');
      
      // Ekstrak konten MDX (hapus metadata dan komponen)
      let content = oldContent;
      
      // Hapus export const metadata
      content = content.replace(/export const metadata = \{[\s\S]*?\};/, '');
      
      // Hapus komponen Cover
      content = content.replace(/<Cover[\s\S]*?\/>/, '');
      
      // Bersihkan whitespace berlebih
      content = content.trim();

      // Buat frontmatter baru dengan escape quotes
      const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
publishedAt: "${post.date}"
coverImage: "${post.coverImage}"
tags: ${JSON.stringify(post.tags)}
---

`;

      // Gabungkan frontmatter dengan konten
      const newContent = frontmatter + content;

      // Tulis file baru
      const newFilePath = path.join(postsDir, `${post.slug}.mdx`);
      fs.writeFileSync(newFilePath, newContent);

      console.log(`✅ Berhasil migrasi: ${post.title}`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error migrasi ${post.title}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Hasil Migrasi:`);
  console.log(`✅ Berhasil: ${successCount} posts`);
  console.log(`❌ Gagal: ${errorCount} posts`);
  console.log(`\n📝 Langkah selanjutnya:`);
  console.log(`1. Test blog posts yang sudah dimigrasi`);
  console.log(`2. Hapus folder blog lama jika sudah yakin`);
  console.log(`3. Update data.ts untuk menghapus BLOG_POSTS lama`);
}

migrateBlogPosts().catch(console.error);
