#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🧹 Membersihkan sistem blog lama...\n');

// Daftar folder blog lama yang akan dihapus
const OLD_BLOG_FOLDERS = [
  'apa-itu-web3',
  'peran-penting-testnet-dalam-ekosistem-kripto',
  'materialisme-dialektika-dan-logika',
  'memahami-reward-dari-testnet-di-industri-crypto',
  'monad-blockchain-layer1-berkinerja-tinggi-yang-kompatibel-dengan-evm',
  'psikologi-uang-dalam-dunia-kripto',
  'blockchain-real-time-yang-mengubah-masa-depan-ethereum',
  'menghubungkan-proyek-lokal-ke-github',
  'konfigurasi-virtual-environment-di-linux',
  'cryptocurrency-lebih-dari-sekadar-trading'
];

const blogDir = path.join(process.cwd(), 'app', 'blog');
let deletedCount = 0;

for (const folder of OLD_BLOG_FOLDERS) {
  const folderPath = path.join(blogDir, folder);
  if (fs.existsSync(folderPath)) {
    try {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`✅ Dihapus: ${folder}`);
      deletedCount++;
    } catch (error) {
      console.log(`❌ Gagal menghapus ${folder}:`, error.message);
    }
  } else {
    console.log(`⚠️  Folder tidak ditemukan: ${folder}`);
  }
}

console.log(`\n📊 Hasil Pembersihan:`);
console.log(`✅ Berhasil dihapus: ${deletedCount} folder`);
console.log(`\n📝 Langkah selanjutnya:`);
console.log(`1. Commit perubahan ke GitHub`);
console.log(`2. Push ke Vercel untuk deployment`);
console.log(`3. Test blog posts di production`);
